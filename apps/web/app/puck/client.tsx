'use client';

import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import config from "../../puck.config";
import { Button } from "@/components/ui/Button";
import { useState, useCallback } from "react";
import { Save, Eye } from 'lucide-react';

function getAdminHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('admin_token');
        if (token) {
            headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        }
    }
    return headers;
}

export function PuckEditor({ path, initialData }: { path: string, initialData: Data }) {
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);

    // Save Draft Logic
    const handleSave = useCallback(async (data: Data): Promise<boolean> => {
        setSaving(true);
        try {
            const res = await fetch('/api/puck', {
                method: 'POST',
                headers: getAdminHeaders(),
                body: JSON.stringify({ path, data })
            });
            if (!res.ok) {
                alert("Failed to save draft. Please verify your admin session.");
                return false;
            }
            return true;
        } finally {
            setSaving(false);
        }
    }, [path]);

    // Publish Logic
    const handlePublish = useCallback(async (data: Data) => {
        setPublishing(true);
        try {
            const saved = await handleSave(data);
            if (!saved) return;
            const res = await fetch('/api/puck', {
                method: 'PUT',
                headers: getAdminHeaders(),
                body: JSON.stringify({ path })
            });
            if (!res.ok) {
                alert("Failed to publish changes. Please verify your admin session.");
                return;
            }
            alert("Published Successfully!");
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
                            disabled={saving || publishing}
                            onClick={async () => {
                                const name = prompt("Name this page configuration:");
                                if (!name) return;
                                try {
                                    const res = await fetch('/api/v1/content/snippets', {
                                        method: 'POST',
                                        headers: getAdminHeaders(),
                                        body: JSON.stringify({ name, data: { content: initialData.content } })
                                    });
                                    if (!res.ok) {
                                        alert("Failed to save snippet.");
                                        return;
                                    }
                                    alert("Saved to Library!");
                                } catch {
                                    alert("Failed to save snippet.");
                                }
                            }}
                            className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                        >
                            <Save className="size-4 mr-1.5" />
                            Save Library
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(path, '_blank', 'noopener,noreferrer')}
                            className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                        >
                            <Eye className="size-4 mr-1.5" />
                            Live View
                        </Button>
                    </div>
                )
            }}
        />
    );
}
