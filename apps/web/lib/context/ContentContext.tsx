'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ContentSchema, ServiceItem } from '../../types/content';
import initialContentJson from '../content/content.json';

const initialContent = initialContentJson as ContentSchema;

type ContentUpdate = {
  path: string;
  value: string;
};

interface ContentContextType {
  content: ContentSchema;
  isEditMode: boolean;
  isDirty: boolean;
  isSaving: boolean;
  setEditMode: (mode: boolean) => void;
  updateContent: (path: string, value: string) => void;
  setLayoutOrder: (path: string, newOrder: unknown[]) => void;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentSchema>(initialContent);
  const [savedContent, setSavedContent] = useState<ContentSchema>(initialContent);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('ahac_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Robust Schema Migration: Merge with initialContent to ensure new keys exist
        // Merge root level objects
        const migratedContent = {
          ...initialContent,
          // Merge root level objects
          landing: {
            ...initialContent.landing,
            ...(parsed.landing || {}),
            services: {
              ...initialContent.landing.services,
              ...(parsed.landing?.services || {}),
              backlinking: {
                ...initialContent.landing.services.backlinking,
                ...(parsed.landing?.services?.backlinking || {})
              },
              grid: Array.isArray(parsed.landing?.services?.grid)
                ? parsed.landing.services.grid
                : initialContent.landing.services.grid,
              carousel: Array.isArray(parsed.landing?.services?.carousel)
                ? parsed.landing.services.carousel
                : initialContent.landing.services.carousel
            },
            sections: (parsed.landing?.sections || initialContent.landing.sections).map((s: string) =>
              s === 'marquee' ? 'partnerships' : s
            ).filter((s: string) => s !== 'gallery'),
            service_areas: {
              ...initialContent.landing.service_areas,
              ...(parsed.landing?.service_areas || {}),
              backlinking: {
                ...initialContent.landing.service_areas.backlinking,
                ...(parsed.landing?.service_areas?.backlinking || {})
              }
            },
            partnerships: {
              ...initialContent.landing.partnerships,
              ...(parsed.landing?.partnerships || {}),
              backlinking: {
                ...initialContent.landing.partnerships.backlinking,
                ...(parsed.landing?.partnerships?.backlinking || {})
              }
            },
            warehouse: {
              ...initialContent.landing.warehouse,
              ...(parsed.landing?.warehouse || {})
            }
          },
          contact: {
            ...initialContent.contact,
            ...(parsed.contact || {}),
            wizard: {
              ...initialContent.contact.wizard,
              ...(parsed.contact?.wizard || {})
            }
          },
          navigation: {
            ...initialContent.navigation,
            ...(parsed.navigation || {})
          },
          shop: {
            ...initialContent.shop,
            ...(parsed.shop || {}),
            hero: {
              ...initialContent.shop.hero,
              ...(parsed.shop?.hero || {})
            },
            guide: {
              ...initialContent.shop.guide,
              ...(parsed.shop?.guide || {})
            },
            sections: Array.isArray(parsed.shop?.sections)
              ? [
                ...parsed.shop.sections.filter((s: string) => initialContent.shop.sections.includes(s)),
                ...initialContent.shop.sections.filter((s: string) => !parsed.shop.sections.includes(s))
              ]
              : initialContent.shop.sections
          }
        };

        // Surgical Typo Correction: Force 'COOLING' if 'COLLING' is found (from user's manual snapshot)
        if (migratedContent.landing?.service_areas?.title_highlight === 'COLLING NETWORK') {
          migratedContent.landing.service_areas.title_highlight = 'COOLING NETWORK';
        }

        // Navigation Recalibration Guard: Force the new order/labels if localStorage is stale
        const currentFirstLinkText = migratedContent.navigation?.links?.[0]?.text;
        if (currentFirstLinkText !== 'MINI SPLIT AC') {
          migratedContent.navigation.links = initialContent.navigation.links;
        }

        setContent(migratedContent);
        setSavedContent(migratedContent);
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
  }, []);

  const updateContent = useCallback((path: string, value: string) => {
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = path.split('.');
      let current: any = newContent;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      setIsDirty(true);
      return newContent;
    });
  }, []);

  const setLayoutOrder = useCallback((path: string, newOrder: unknown[]) => {
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current: Record<string, unknown> = newContent as unknown as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = newOrder;
      setIsDirty(true);
      return newContent as ContentSchema;
    });
  }, []);

  const discardChanges = useCallback(() => {
    setContent(savedContent);
    setIsDirty(false);
  }, [savedContent]);

  const saveChanges = useCallback(async () => {
    setIsSaving(true);
    try {
      // Persist to localStorage
      localStorage.setItem('ahac_content', JSON.stringify(content));

      // Update session master
      setSavedContent(content);
      setIsDirty(false);

      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error('Failed to save to file');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save changes. Please check console or server logs.');
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  return (
    <ContentContext.Provider value={{
      content,
      isEditMode,
      isDirty,
      isSaving,
      setEditMode: setIsEditMode,
      updateContent,
      setLayoutOrder,
      saveChanges,
      discardChanges
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
