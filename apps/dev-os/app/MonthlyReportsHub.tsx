'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    FileText,
    Download,
    Upload,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    Eye,
    Copy,
    Check,
    Calendar,
    ChevronRight,
    TrendingUp,
    BarChart3,
    Compass,
    ExternalLink,
    Zap,
    Play,
    ShieldCheck,
    FileSpreadsheet,
    X,
    FileCode
} from 'lucide-react';

interface MonthlyReport {
    month: string;
    year: string;
    folder: string;
    md_path: string;
    html_path: string | null;
    docx_path: string | null;
    has_docx: boolean;
    has_html: boolean;
    modified_time: number;
}

interface MonthlyReportsHubProps {
    onLog?: (msg: string) => void;
    onInspectAgent?: (agentId: string) => void;
}

export default function MonthlyReportsHub({ onLog, onInspectAgent }: MonthlyReportsHubProps) {
    const [reports, setReports] = useState<MonthlyReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [uploading, setUploading] = useState<boolean>(false);
    const [generating, setGenerating] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<string>('September');
    const [selectedYear, setSelectedYear] = useState<string>('2026');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [runningAgent, setRunningAgent] = useState<string | null>(null);

    // Preview Modal State
    const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
    const [previewContent, setPreviewContent] = useState<string>('');
    const [previewFormat, setPreviewFormat] = useState<'html' | 'markdown'>('html');
    const [previewTitle, setPreviewTitle] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/v1/dev-os/reports');
            if (res.ok) {
                const data = await res.json();
                setReports(data.reports || []);
            } else {
                setFeedback({ type: 'error', message: 'Failed to load executive reports from server.' });
            }
        } catch (err: any) {
            setFeedback({ type: 'error', message: `Network error: ${err.message}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadAndCompile = async () => {
        if (!selectedFile) {
            setFeedback({ type: 'error', message: 'Please select a Search Console .zip or analytics CSV file to upload.' });
            return;
        }

        setUploading(true);
        setFeedback({ type: 'info', message: `Uploading ${selectedFile.name} and executing Sub-Master 10 pipeline...` });
        onLog?.(`[Sub-Master 10] Upload initiated: ${selectedFile.name} for ${selectedMonth} ${selectedYear}`);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('month', selectedMonth);
            formData.append('year', selectedYear);

            const res = await fetch('/api/v1/dev-os/reports/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setFeedback({
                    type: 'success',
                    message: `Flawlessly compiled ${selectedMonth} ${selectedYear} report! Word (.docx), HTML, and Markdown are ready.`
                });
                onLog?.(`[Sub-Master 10] Successfully synthesized ${selectedMonth} ${selectedYear} report.`);
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                await fetchReports();
            } else {
                const errData = await res.json().catch(() => ({ detail: 'Upload error' }));
                setFeedback({ type: 'error', message: `Failed to compile: ${errData.detail || 'Server error'}` });
            }
        } catch (err: any) {
            setFeedback({ type: 'error', message: `Error: ${err.message}` });
        } finally {
            setUploading(false);
        }
    };

    const handleRegenerate = async (month: string, year: string) => {
        setGenerating(true);
        setFeedback({ type: 'info', message: `Regenerating report for ${month} ${year}...` });
        onLog?.(`[Sub-Master 10] Regenerating ${month} ${year} documents...`);

        try {
            const res = await fetch('/api/v1/dev-os/reports/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month, year }),
            });

            if (res.ok) {
                setFeedback({ type: 'success', message: `Successfully regenerated ${month} ${year} reports (.docx, .html, .md).` });
                onLog?.(`[Sub-Master 10] ${month} ${year} report refreshed.`);
                await fetchReports();
            } else {
                const errData = await res.json().catch(() => ({ detail: 'Regeneration error' }));
                setFeedback({ type: 'error', message: `Regeneration failed: ${errData.detail}` });
            }
        } catch (err: any) {
            setFeedback({ type: 'error', message: `Error: ${err.message}` });
        } finally {
            setGenerating(false);
        }
    };

    const handleOpenPreview = async (report: MonthlyReport, format: 'html' | 'markdown') => {
        setPreviewTitle(`${report.month} ${report.year} Executive SEO Report`);
        setPreviewFormat(format);
        setPreviewModalOpen(true);
        setPreviewContent('Loading preview...');

        try {
            const res = await fetch(`/api/v1/dev-os/reports/preview?month=${report.month}&year=${report.year}&format=${format}`);
            if (res.ok) {
                if (format === 'html') {
                    const html = await res.text();
                    setPreviewContent(html);
                } else {
                    const data = await res.json();
                    setPreviewContent(data.content || '');
                }
            } else {
                setPreviewContent('Failed to load report preview content.');
            }
        } catch (err: any) {
            setPreviewContent(`Error loading preview: ${err.message}`);
        }
    };

    const handleDownload = (report: MonthlyReport, fileType: 'docx' | 'html' | 'md') => {
        onLog?.(`[Sub-Master 10] Downloading ${report.month} ${report.year} (${fileType})...`);
        const url = `/api/v1/dev-os/reports/download?month=${encodeURIComponent(report.month)}&year=${encodeURIComponent(report.year)}&file_type=${fileType}`;
        window.open(url, '_blank');
    };

    const runSpecializedAgent = async (agentId: string) => {
        setRunningAgent(agentId);
        onLog?.(`[Dev OS] Triggering satellite agent: ${agentId}`);
        try {
            const res = await fetch(`/api/v1/dev-os/agents/run/${agentId}`, { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                setFeedback({
                    type: 'success',
                    message: `${agentId} executed successfully: ${data.details || 'Operational status optimal.'}`
                });
                onLog?.(`[${agentId}] Result: ${JSON.stringify(data.status)}`);
            } else {
                setFeedback({ type: 'error', message: `Failed to execute ${agentId}` });
            }
        } catch (err: any) {
            setFeedback({ type: 'error', message: `Execution error: ${err.message}` });
        } finally {
            setRunningAgent(null);
        }
    };

    const handleCopyMarkdown = () => {
        if (!previewContent) return;
        navigator.clipboard.writeText(previewContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Division Banner & Sub-Master 10 Header */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/20">
                            <BarChart3 className="size-8 animate-pulse text-cyan-300" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                                    SUB-MASTER 10
                                </span>
                                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                                    AUTONOMOUS REPORTING DIVISION
                                </span>
                                <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] text-purple-300">
                                    3RD-GRADE EXECUTIVE SYNTHESIS
                                </span>
                            </div>
                            <h1 className="mt-1 text-2xl font-black tracking-tight text-white">
                                Executive Monthly Analytics & SEO Reports
                            </h1>
                            <p className="mt-1 max-w-3xl text-xs text-slate-300">
                                Autonomous conversion of raw Search Console archives and GA4 telemetry into plain-English, 
                                publication-ready Word documents (<span className="text-cyan-400 font-mono">.docx</span>), styled presentations (<span className="text-cyan-400 font-mono">.html</span>), and source Markdown (<span className="text-cyan-400 font-mono">.md</span>). Zero billing friction.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchReports}
                            disabled={loading}
                            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 font-mono text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
                        >
                            <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
                            Refresh Archive
                        </button>
                    </div>
                </div>

                {/* Satellite Agents Synapse Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-800/80 pt-5">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                                <span className="text-xs font-bold text-slate-200 font-mono">agent_report_ingestor</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Raw GSC Zip & GA4 CSV Ingestion</p>
                        </div>
                        <button
                            onClick={() => runSpecializedAgent('agent_report_ingestor')}
                            disabled={runningAgent === 'agent_report_ingestor'}
                            className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-mono font-semibold text-cyan-300 hover:bg-cyan-500/20"
                        >
                            <Play className="size-3" />
                            Run
                        </button>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-cyan-400" />
                                <span className="text-xs font-bold text-slate-200 font-mono">agent_narrative_crafter</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Plain-English 3rd-Grade Synthesis</p>
                        </div>
                        <button
                            onClick={() => runSpecializedAgent('agent_narrative_crafter')}
                            disabled={runningAgent === 'agent_narrative_crafter'}
                            className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-mono font-semibold text-cyan-300 hover:bg-cyan-500/20"
                        >
                            <Play className="size-3" />
                            Run
                        </button>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-purple-400" />
                                <span className="text-xs font-bold text-slate-200 font-mono">agent_document_forge</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Word (.docx), HTML & Markdown Compiler</p>
                        </div>
                        <button
                            onClick={() => runSpecializedAgent('agent_document_forge')}
                            disabled={runningAgent === 'agent_document_forge'}
                            className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-mono font-semibold text-cyan-300 hover:bg-cyan-500/20"
                        >
                            <Play className="size-3" />
                            Run
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification / Feedback Banner */}
            {feedback && (
                <div className={`rounded-xl border p-4 text-xs flex items-center justify-between ${
                    feedback.type === 'success' 
                        ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                        : feedback.type === 'error'
                        ? 'border-rose-500/40 bg-rose-950/30 text-rose-300'
                        : 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                }`}>
                    <div className="flex items-center gap-2.5">
                        {feedback.type === 'success' ? <CheckCircle2 className="size-4 shrink-0 text-emerald-400" /> : <AlertCircle className="size-4 shrink-0" />}
                        <span>{feedback.message}</span>
                    </div>
                    <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">
                        <X className="size-4" />
                    </button>
                </div>
            )}

            {/* Main Operational Split: Ingestion Dropzone & Monthly Catalog */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Upload & Ingestion Staging Zone */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-2.5">
                                <Upload className="size-5 text-cyan-400" />
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                                    Raw Ingestion Staging
                                </h2>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                                1-Click Pipeline
                            </span>
                        </div>

                        {/* Month & Year Selectors */}
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                                    Report Month
                                </label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
                                >
                                    {MONTHS.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                                    Calendar Year
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
                                >
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                        </div>

                        {/* Drag and Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleFileDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition cursor-pointer ${
                                isDragOver 
                                    ? 'border-cyan-400 bg-cyan-500/10' 
                                    : selectedFile
                                    ? 'border-emerald-500/60 bg-emerald-500/5'
                                    : 'border-slate-700 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-950'
                            }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".zip,.csv"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            {selectedFile ? (
                                <div className="space-y-2">
                                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <p className="text-xs font-bold text-white font-mono">{selectedFile.name}</p>
                                    <p className="text-[10px] text-slate-400">
                                        {(selectedFile.size / 1024).toFixed(1)} KB • Click to swap file
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                                        <Upload className="size-6" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-200">
                                        Drop Search Console ZIP or GA4 CSV here
                                    </p>
                                    <p className="text-[11px] text-slate-500">
                                        Supports <span className="text-slate-400 font-mono">Performance-on-Search*.zip</span>, Chart.csv, Queries.csv
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Execute Action Button */}
                        <div className="mt-5">
                            <button
                                onClick={handleUploadAndCompile}
                                disabled={uploading || !selectedFile}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-3 font-mono text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Zap className={`size-4 ${uploading ? 'animate-bounce' : ''}`} />
                                {uploading ? 'Synthesizing 3rd-Grade Report...' : '⚡ Ingest & Compile Executive Report'}
                            </button>
                        </div>

                        <div className="mt-4 rounded-xl bg-slate-950/80 p-3 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold font-mono">
                                <Sparkles className="size-3.5" />
                                <span>Multi-Format Output Guarantee:</span>
                            </div>
                            <p>• Native Microsoft Word document (<span className="text-slate-200">.docx</span>) formatted with executive styling.</p>
                            <p>• Mobile-responsive HTML presentation (<span className="text-slate-200">.html</span>).</p>
                            <p>• Raw source Markdown (<span className="text-slate-200">.md</span>) ready for instant copy-paste.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Historical Reports Catalog */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-2.5">
                                <FileText className="size-5 text-cyan-400" />
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                                    Monthly Executive Reports Catalog
                                </h2>
                            </div>
                            <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                                {reports.length} Compiled Reports
                            </span>
                        </div>

                        {loading ? (
                            <div className="py-16 text-center">
                                <RefreshCw className="size-8 mx-auto animate-spin text-cyan-400 mb-3" />
                                <p className="text-xs text-slate-400 font-mono">Scanning _analytics_data archive...</p>
                            </div>
                        ) : reports.length === 0 ? (
                            <div className="py-16 text-center">
                                <FileSpreadsheet className="size-10 mx-auto text-slate-600 mb-3" />
                                <p className="text-xs text-slate-400">No monthly executive reports found.</p>
                                <p className="text-[11px] text-slate-500 mt-1">Upload a Search Console zip to generate your first report.</p>
                            </div>
                        ) : (
                            <div className="mt-5 space-y-4">
                                {reports.map((report) => (
                                    <div
                                        key={`${report.month}-${report.year}`}
                                        className="group rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-cyan-500/40 hover:bg-slate-950"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white text-base tracking-tight">
                                                        {report.month} {report.year}
                                                    </span>
                                                    <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/20">
                                                        CEO-SEO-Report
                                                    </span>
                                                    {report.has_docx && (
                                                        <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-blue-400 border border-blue-500/30">
                                                            DOCX
                                                        </span>
                                                    )}
                                                    {report.has_html && (
                                                        <span className="rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-purple-400 border border-purple-500/30">
                                                            HTML
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                                                    Last updated: {new Date(report.modified_time * 1000).toLocaleDateString()} at {new Date(report.modified_time * 1000).toLocaleTimeString()}
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <button
                                                    onClick={() => handleOpenPreview(report, 'html')}
                                                    className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
                                                    title="View presentation in Dev OS"
                                                >
                                                    <Eye className="size-3.5" />
                                                    Preview
                                                </button>

                                                {/* Word Document (.docx) Download */}
                                                <button
                                                    onClick={() => handleDownload(report, 'docx')}
                                                    className="flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-blue-300 hover:bg-blue-500/20 transition shadow-sm"
                                                    title="Download Microsoft Word (.docx)"
                                                >
                                                    <Download className="size-3.5 text-blue-400" />
                                                    Word (.docx)
                                                </button>

                                                {/* HTML Download */}
                                                <button
                                                    onClick={() => handleDownload(report, 'html')}
                                                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition"
                                                    title="Download HTML presentation"
                                                >
                                                    <ExternalLink className="size-3" />
                                                    HTML
                                                </button>

                                                {/* Markdown Download */}
                                                <button
                                                    onClick={() => handleDownload(report, 'md')}
                                                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition"
                                                    title="Download Markdown (.md)"
                                                >
                                                    <FileCode className="size-3" />
                                                    MD
                                                </button>

                                                {/* Regenerate Button */}
                                                <button
                                                    onClick={() => handleRegenerate(report.month, report.year)}
                                                    disabled={generating}
                                                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
                                                    title="Regenerate all formats"
                                                >
                                                    <RefreshCw className={`size-3 ${generating ? 'animate-spin' : ''}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Live Preview Modal */}
            {previewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="relative flex flex-col h-[90vh] w-full max-w-5xl rounded-2xl border border-cyan-500/30 bg-slate-950 shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="size-5 text-cyan-400" />
                                <div>
                                    <h3 className="text-sm font-bold text-white font-mono">{previewTitle}</h3>
                                    <p className="text-[11px] text-slate-400">Executive Preview • 3rd-Grade Reading Level</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyMarkdown}
                                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition"
                                >
                                    {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                                    {copied ? 'Copied!' : 'Copy Source'}
                                </button>
                                <button
                                    onClick={() => setPreviewModalOpen(false)}
                                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-auto p-6 bg-slate-950">
                            {previewFormat === 'html' ? (
                                <iframe
                                    srcDoc={previewContent}
                                    title="Report Preview"
                                    className="h-full w-full rounded-xl border border-slate-800 bg-white"
                                />
                            ) : (
                                <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {previewContent}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
