'use client';

import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import config from "../../puck.config";
import { Button } from "@/components/ui/Button";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function PuckEditor({ path, initialData }: { path: string, initialData: Data }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);

    // Save Draft Logic
    const handleSave = useCallback(async (data: Data) => {
        setSaving(true);
        try {
            await fetch('/api/puck', {
                method: 'POST',
                body: JSON.stringify({ path, data })
            });
            // Optional: Toast success
        } finally {
            setSaving(false);
        }
    }, [path]);

    // Publish Logic
    const handlePublish = useCallback(async (data: Data) => {
        setPublishing(true);
        try {
            // First save draft
            await handleSave(data);
            // Then promote
            await fetch('/api/puck', {
                method: 'PUT',
                body: JSON.stringify({ path })
            });
            alert("Published Successfully!"); // Replace with nice toast
        } finally {
            setPublishing(false);
        }
    }, [path, handleSave]);

    return (
        <Puck
            config={config}
            data={initialData}
            onPublish={handlePublish}
            headerTitle={`Editing: ${path}`}
            headerPath={path}
            overrides={{
                headerActions: ({ children }) => (
                    <div className="flex gap-2">
                        {children}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                                const name = prompt("Name this page configuration:");
                                if (!name) return;
                                try {
                                    await fetch('/api/v1/content/snippets', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ name, data: { content: initialData.content } })
                                    });
                                    alert("Saved to Library!");
                                } catch (e) {
                                    alert("Failed to save snippet.");
                                }
                            }}
                            className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                        >
                            <span className="material-symbols-outlined text-sm mr-1">save</span>
                            Save Library
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(path, '_blank')}
                            className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                        >
                            <span className="material-symbols-outlined text-sm mr-1">visibility</span>
                            Live View
                        </Button>
                    </div>
                )
            }}
        />
    );
}
