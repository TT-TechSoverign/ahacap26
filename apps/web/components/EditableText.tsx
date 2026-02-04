'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { useContent } from '../lib/context/ContentContext';

interface EditableTextProps {
  contentKey: string;
  className?: string;
  as?: React.ElementType;
  multiLine?: boolean;
  defaultValue?: string;
}

export function EditableText({
  contentKey,
  className,
  as: Component = 'span',
  multiLine = false,
  defaultValue = ''
}: EditableTextProps) {
  const { content } = useContent();

  // Helper to get nested value from content object
  const getValue = (path: string, obj: any): string => {
    const value = path.split('.').reduce((prev, curr) => prev && prev[curr], obj) as string;
    return value || defaultValue;
  };

  const textValue = getValue(contentKey, content);

  return (
    <Component className={className}>
      {textValue}
    </Component>
  );
}
