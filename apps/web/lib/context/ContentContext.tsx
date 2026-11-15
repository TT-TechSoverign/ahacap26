'use client';

import React, { createContext, startTransition, useCallback, useContext, useEffect, useState } from 'react';
import { ContentSchema, ServiceItem } from '../../types/content';
import initialContentJson from '../content/content.json';

const initialContent = initialContentJson as any;

type ContentUpdate = {
  path: string;
  value: string;
  section?: string;
};

interface ContentContextType {
  content: ContentSchema;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentSchema>(initialContent);

  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/content', { cache: 'no-store' });
      if (res.ok) {
        const response = await res.json();
        // API returns { data: {}, path: "" }, so we need to unwrap it if present
        const incomingData = response.data || response;
        // Merge with initial content inside a low-priority transition so hydration/input stays unblocked
        startTransition(() => {
          setContent(() => ({ ...initialContent, ...incomingData }));
        });
      }
    } catch (error) {
      console.error('Failed to refresh content:', error);
    }
  }, []);

  // Fetch fresh content strictly after First Paint/LCP so initial render is never contended
  useEffect(() => {
    let timer: number | undefined;
    const raf = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => {
        refreshContent();
      }, 300);
    });
    return () => {
      window.cancelAnimationFrame(raf);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [refreshContent]);

  return (
    <ContentContext.Provider value={{ content, refreshContent }}>
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
