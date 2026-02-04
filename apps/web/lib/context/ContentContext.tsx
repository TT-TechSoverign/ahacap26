'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ContentSchema, ServiceItem } from '../../types/content';
import initialContentJson from '../content/content.json';

const initialContent = initialContentJson as any;

type ContentUpdate = {
  path: string;
  value: string;
};

interface ContentContextType {
  content: ContentSchema;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content] = useState<ContentSchema>(initialContent);

  // Read-only provider
  return (
    <ContentContext.Provider value={{ content }}>
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
