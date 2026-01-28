'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

// PIN 8081 (Abstracted)
const MASTER_PIN = '8081';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session storage on mount
        const auth = sessionStorage.getItem('puck_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (pin === MASTER_PIN) {
            sessionStorage.setItem('puck_auth', 'true');
            setIsAuthenticated(true);
        } else {
            setError('INVALID ACCESS CODE');
            // Shake effect or visual feedback could be added here
        }
    };

    if (loading) return null; // Or a spinner

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
                            <span className="material-symbols-outlined text-blue-500 text-3xl">shield_lock</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Restricted Area</h1>
                        <p className="text-slate-400 text-sm mt-2">Sovereign Content Management System</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-blue-400 text-xs font-bold uppercase tracking-widest pl-1">
                                Access PIN
                            </label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-white text-center text-2xl tracking-[0.5em] py-4 rounded-lg outline-none transition-all placeholder:tracking-normal placeholder:text-slate-700 font-mono"
                                placeholder="••••"
                                maxLength={4}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center py-3 rounded uppercase font-bold tracking-wide animate-pulse">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] transition-all uppercase font-bold tracking-widest text-sm">
                            Authenticate
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-800 pt-6">
                        <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                            Authorized Personnel Only <br />
                            IP Logged: {typeof window !== 'undefined' ? '127.0.0.1' : ''}
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
