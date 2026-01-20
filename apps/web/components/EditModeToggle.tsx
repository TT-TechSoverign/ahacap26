'use client';

import { cn } from '@/lib/utils';
import { useContent } from '../lib/context/ContentContext';
import { Button } from './ui/Button';

export function EditModeToggle() {
  const { isEditMode, isDirty, isSaving, setEditMode, saveChanges, discardChanges } = useContent();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
      {isEditMode && isDirty && (
        <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
          <Button
            onClick={discardChanges}
            disabled={isSaving}
            variant="ghost"
            className="bg-background-dark/80 border border-white/10 text-slate-400 hover:text-white editor-control"
          >
            DISCARD
          </Button>
          <Button
            onClick={saveChanges}
            disabled={isSaving}
            className="bg-accent hover:bg-accent/80 text-black font-black tracking-widest px-8 shadow-[0_0_20px_rgba(57,181,74,0.4)] editor-control"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin size-4 border-2 border-black border-t-transparent rounded-full"></span>
                SAVING...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined font-black">save</span>
                SAVE CHANGES
              </span>
            )}
          </Button>
        </div>
      )}

      <Button
        onClick={() => setEditMode(!isEditMode)}
        variant={isEditMode ? "destructive" : "default"}
        disabled={isSaving}
        className={cn(
          "h-14 px-8 font-black tracking-[0.2em] shadow-2xl transition-all editor-control",
          isEditMode ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/80"
        )}
      >
        <span className="material-symbols-outlined mr-3 font-black">
          {isEditMode ? 'close' : 'edit_note'}
        </span>
        {isEditMode ? 'EXIT EDITOR' : 'ENTER VISUAL EDITOR'}
      </Button>
    </div>
  );
}
