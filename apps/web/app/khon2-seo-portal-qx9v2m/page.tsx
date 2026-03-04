'use client';

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as LucideIcons from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';

const KHON2_PASSWORD = "KHON2X7V9K2PQ8A4"; // Requirement: 16-character alphanumeric password, all caps
const STORAGE_KEY = 'khon2_seo_portal_drafts';

export default function KHON2SEOPortal() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [csvData, setCsvData] = useState<{ filename: string, data: any[] }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === KHON2_PASSWORD) {
            setIsAuthenticated(true);
            setError("");
            loadData();
        } else {
            setError("Invalid Access Code. Access Denied.");
        }
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch the absolute latest global drafts from the remote server
            let globalDrafts: { filename: string, data: any[] }[] = [];
            try {
                const draftRes = await fetch('/api/v1/khon2-portal/drafts');
                if (draftRes.ok) {
                    const json = await draftRes.json();
                    if (json.data && Array.isArray(json.data)) {
                        globalDrafts = json.data;
                    }
                }
            } catch (err) {
                console.error("Failed to fetch global drafts from server", err);
            }

            // 2. Load the base CSV files
            const files = [
                'AHAC_KHON2_CONTENTS - HomePage.csv',
                'AHAC_KHON2_CONTENTS - Mini Split AC Maintenance Page.csv',
                'AHAC_KHON2_CONTENTS - Mini Split AC Page.csv',
                'AHAC_KHON2_CONTENTS - Service Areas Page.csv',
                'AHAC_KHON2_CONTENTS - Shop Page (Products).csv',
                'AHAC_KHON2_CONTENTS - Window AC Cleaning Page.csv'
            ];

            const loadedData = await Promise.all(
                files.map(async (filename) => {
                    const response = await fetch(`/content/seo-drafts/${filename}`);
                    if (!response.ok) {
                        console.error(`Failed to load ${filename}`);
                        return { filename, data: [] };
                    }
                    const text = await response.text();
                    
                    return new Promise<{ filename: string, data: any[] }>((resolve) => {
                        Papa.parse(text, {
                            header: true,
                            skipEmptyLines: true,
                            complete: (results) => {
                                const cleanedData = results.data.filter((row: any) => {
                                    return Object.values(row).some(v => typeof v === 'string' && v.trim() !== '');
                                });

                                // 3. Merge with Global Server Drafts
                                const draftFile = globalDrafts.find(d => d.filename === filename);
                                if (draftFile && draftFile.data) {
                                    cleanedData.forEach((row: any, i: number) => {
                                        if (draftFile.data[i]) {
                                            Object.keys(row).forEach(key => {
                                                const isEditable = key.includes('SEO') || key.includes('Notes') || key.includes('Optimized');
                                                if (isEditable && draftFile.data[i][key]) {
                                                    row[key] = draftFile.data[i][key];
                                                }
                                            });
                                        }
                                    });
                                }

                                resolve({ filename, data: cleanedData });
                            },
                        });
                    });
                })
            );

            setCsvData(loadedData.filter(d => d.data.length > 0));
        } catch (err) {
            console.error("Error loading data:", err);
            setError("Failed to load portal configuration. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCellChange = (fileIndex: number, rowIndex: number, field: string, value: string) => {
        const newData = [...csvData];
        newData[fileIndex].data[rowIndex][field] = value;
        setCsvData(newData);
    };

    const [isSaving, setIsSaving] = useState(false);

    const saveProgress = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/v1/khon2-portal/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: csvData })
            });

            if (res.ok) {
                alert("✅ Progress Saved Globally! Any authorized user will now see your latest edits.");
            } else {
                throw new Error("Server rejected save request.");
            }
        } catch (e) {
            console.error("Failed to save progress globally", e);
            alert("❌ Failed to save progress to server. Ensure connection is stable.");
        } finally {
            setIsSaving(false);
        }
    };

    const exportToCSV = (fileIndex: number) => {
        const file = csvData[fileIndex];
        const csv = Papa.unparse(file.data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `OPTIMIZED_${file.filename}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>
                
                <div className="relative z-10 w-full max-w-md bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                            <LucideIcons.ShieldAlert className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-header font-black text-white uppercase tracking-widest text-center">
                            Restricted Access
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 text-center">
                            KHON2 SEO Authorized Personnel Only
                        </p>
                    </div>

                    <form onSubmit={checkAuth} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">
                                Access Password
                            </label>
                            <input 
                                type="password" 
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value.toUpperCase())}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-center tracking-widest font-mono"
                                placeholder="XXXXX-XXXXX-XXXXX"
                            />
                        </div>
                        
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-2 px-4 rounded-lg text-center font-bold">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-black font-header font-black uppercase tracking-widest py-3 rounded-xl transition-all duration-300"
                        >
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-200">
            <main className="pt-[220px] md:pt-[280px] lg:pt-[330px] pb-24 max-w-[1600px] mx-auto p-6 md:p-8">
                {/* Portal Header */}
                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                            <LucideIcons.Database className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-header font-black text-white uppercase tracking-widest">
                                KHON2 Portal
                            </h1>
                            <p className="text-xs md:text-sm text-emerald-400 uppercase tracking-widest font-bold">
                                Secured Isolated Environment
                            </p>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <LucideIcons.Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Loading Data Tables...</p>
                    </div>
                ) : csvData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4 bg-white/5 border border-white/10 rounded-2xl">
                        <LucideIcons.DatabaseZap className="w-12 h-12 text-slate-600" />
                        <p className="text-slate-400 font-bold tracking-widest text-lg">No CSV Files Found.</p>
                        <p className="text-slate-500 text-sm">Ensure the 6 CSV files are in the public/content/seo-drafts directory.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Tab Switcher */}
                        <div className="flex flex-wrap gap-2">
                            {csvData.map((file, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                        activeTab === idx 
                                            ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                    }`}
                                >
                                    {file.filename.replace('AHAC_KHON2_CONTENTS - ', '').replace('.csv', '')}
                                </button>
                            ))}
                        </div>

                        {/* Active Data Table */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {/* Table Header Action Bar */}
                            <div className="bg-white/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10">
                                <div>
                                    <h2 className="text-xl font-header font-black text-white uppercase tracking-widest">
                                        {csvData[activeTab].filename.replace('AHAC_KHON2_CONTENTS - ', '').replace('.csv', '')}
                                    </h2>
                                    <p className="text-xs font-mono text-slate-500 mt-1">
                                        Rows: {csvData[activeTab].data.length}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <button 
                                        onClick={saveProgress}
                                        disabled={isSaving}
                                        className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50 px-6 py-2 rounded-xl transition-all duration-300 group flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <LucideIcons.Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        )}
                                        <span className="text-xs font-bold uppercase tracking-widest">{isSaving ? 'Saving...' : 'Save Progress'}</span>
                                    </button>

                                    <button 
                                        onClick={() => exportToCSV(activeTab)}
                                        className="flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50 px-6 py-2 rounded-xl transition-all duration-300 group flex-1 md:flex-none"
                                    >
                                        <LucideIcons.Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Download Updated CSV</span>
                                    </button>
                                </div>
                            </div>

                            {/* Actual Data Cards */}
                            <div className="p-4 md:p-6 space-y-6">
                                {csvData[activeTab].data.map((row, rowIndex) => {
                                    const keys = Object.keys(row);
                                    const readOnlyKeys = keys.filter(key => !key.includes('SEO') && !key.includes('Notes') && !key.includes('Optimized'));
                                    const editableKeys = keys.filter(key => key.includes('SEO') || key.includes('Notes') || key.includes('Optimized'));

                                    return (
                                        <div key={rowIndex} className="bg-black/20 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 group">
                                            
                                            {/* Top Row: Context Information */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                                {readOnlyKeys.map((key, colIndex) => (
                                                    <div key={colIndex}>
                                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                            {key}
                                                        </h3>
                                                        <div className="text-sm text-slate-300 font-light leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-4 min-h-[80px]">
                                                            {row[key] || <span className="text-slate-700 italic">Empty</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Bottom Row: KHON2 Editable Inputs */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                                {editableKeys.map((key, colIndex) => (
                                                    <div key={colIndex}>
                                                        <h3 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                            <LucideIcons.Edit3 className="w-3 h-3" />
                                                            {key}
                                                        </h3>
                                                        <textarea 
                                                            value={row[key] || ""}
                                                            onChange={(e) => handleCellChange(activeTab, rowIndex, key, e.target.value)}
                                                            className="w-full min-h-[120px] bg-black/40 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-emerald-400 font-medium placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-y text-sm"
                                                            placeholder={`Enter ${key}...`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>

                            {/* Bottom Action Bar */}
                            <div className="bg-white/5 px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 mt-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                        End of Document
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Don&apos;t forget to save or download your changes.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <button 
                                        onClick={saveProgress}
                                        disabled={isSaving}
                                        className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50 px-6 py-2 md:py-3 rounded-xl transition-all duration-300 group flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <LucideIcons.Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <LucideIcons.Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        )}
                                        <span className="text-sm font-bold uppercase tracking-widest">{isSaving ? 'Saving...' : 'Save Progress'}</span>
                                    </button>

                                    <button 
                                        onClick={() => exportToCSV(activeTab)}
                                        className="flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50 px-6 py-2 md:py-3 rounded-xl transition-all duration-300 group flex-1 md:flex-none shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                                    >
                                        <LucideIcons.Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                        <span className="text-sm font-bold uppercase tracking-widest">Download Updated CSV</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <BackToTop visible={true} />
        </div>
    );
}
