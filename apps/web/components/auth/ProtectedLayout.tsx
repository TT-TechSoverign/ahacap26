'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Lock } from 'lucide-react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function verifyExistingSession() {
            try {
                const token = sessionStorage.getItem('admin_token');
                if (!token) {
                    sessionStorage.removeItem('puck_auth');
                    if (!cancelled) setLoading(false);
                    return;
                }
                const res = await fetch('/api/v1/admin/verify', {
                    method: 'POST',
                    headers: {
                        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                    },
                    cache: 'no-store',
                });
                if (!cancelled) {
                    if (res.ok) {
                        setIsAuthenticated(true);
                    } else {
                        sessionStorage.removeItem('admin_token');
                        sessionStorage.removeItem('puck_auth');
                        setIsAuthenticated(false);
                    }
                    setLoading(false);
                }
            } catch {
                if (!cancelled) {
                    setIsAuthenticated(false);
                    setLoading(false);
                }
            }
        }
        verifyExistingSession();
        return () => {
            cancelled = true;
        };
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const res = await fetch('/api/v1/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.token) {
                    sessionStorage.setItem('admin_token', data.token);
                    sessionStorage.setItem('puck_auth', 'true');
                    document.cookie = `admin_session=${encodeURIComponent(data.token)}; path=/; max-age=86400; SameSite=Strict${window.location.protocol === 'https:' ? '; Secure' : ''}`;
                }
                setIsAuthenticated(true);
            } else {
                if (res.status === 429) {
                    setError('TOO MANY LOGIN ATTEMPTS. PLEASE TRY AGAIN LATER.');
                } else {
                    setError('INVALID ACCESS CODE');
                }
                setPin('');
            }
        } catch {
            setError('CONNECTION ERROR');
            setPin('');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
                            <Lock className="text-blue-500 size-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Restricted Area</h1>
                        <p className="text-slate-400 text-sm mt-2">AHAC Management Hub</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-blue-400 text-xs font-bold uppercase tracking-widest pl-1">
                                Access PIN or Master Key
                            </label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-white text-center text-lg tracking-widest py-4 px-3 rounded-lg outline-none transition-all placeholder:tracking-normal placeholder:text-slate-700 font-mono"
                                maxLength={128}
                                disabled={submitting}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center py-3 rounded uppercase font-bold tracking-wide animate-pulse">
                                {error}
                            </div>
                        )}

                        <Button type="submit" disabled={submitting} className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] transition-all uppercase font-bold tracking-widest text-sm">
                            {submitting ? 'Authenticating...' : 'Authenticate'}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-800 pt-6">
                        <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                            Authorized Personnel Only • Session Audit Active
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {children}
        </div>
    );
}
