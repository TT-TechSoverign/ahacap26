'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { useContent } from '../lib/context/ContentContext';

interface EditableTextProps {
  contentKey: string;
  className?: string;
  as?: React.ElementType;
  multiLine?: boolean;
}

export function EditableText({
  contentKey,
  className,
  as: Component = 'span',
  multiLine = false
}: EditableTextProps) {
  const { content, isEditMode, updateContent } = useContent();
  const elementRef = useRef<HTMLElement>(null);

  // Helper to get nested value from content object
  const getValue = (path: string, obj: any): string => {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj) as string || '';
  };

  const textValue = getValue(contentKey, content);

  // Synchronize content with DOM when textValue changes externally (not during active edit)
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== textValue) {
      elementRef.current.innerText = textValue;
    }
  }, [textValue]);

  const handleBlur = () => {
    if (elementRef.current) {
      const newValue = elementRef.current.innerText;
      updateContent(contentKey, newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiLine) {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <Component
      ref={elementRef}
      contentEditable={isEditMode}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onMouseDown={(e) => isEditMode && e.stopPropagation()}
      onClick={(e) => {
        if (isEditMode) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      suppressContentEditableWarning
      className={cn(
        className,
        isEditMode && "outline-dashed outline-2 outline-primary/50 bg-primary/5 cursor-text animate-pulse-subtle rounded-sm transition-all hover:outline-primary hover:bg-primary/10",
        isEditMode && "relative z-10"
      )}
      title={isEditMode ? `Editing: ${contentKey} (Click to edit)` : undefined}
    >
      {textValue}
    </Component>
  );
}
