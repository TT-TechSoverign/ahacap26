'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
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
        setContent(response.data || response);
      }
    } catch (error) {
      console.error('Failed to refresh content:', error);
    }
  }, []);

  // Fetch fresh content on mount to ensure we have the latest server-side edits
  useEffect(() => {
    refreshContent();
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
