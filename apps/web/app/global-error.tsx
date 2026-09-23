'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body style={{ backgroundColor: '#070b12', color: '#ffffff', fontFamily: 'sans-serif', margin: 0, padding: '24px', display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: '420px', width: '100%', backgroundColor: '#0f172a', border: '1px solid rgba(0,174,239,0.3)', borderRadius: '24px', padding: '32px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0,174,239,0.1)', border: '1px solid rgba(0,174,239,0.3)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        ❄️
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff', margin: '0 0 8px' }}>
                        Affordable Home A/C
                    </h2>
                    <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 24px' }}>
                        A temporary mobile browser connection glitch occurred. Tap below to reload the fresh Hawaii cooling catalog.
                    </p>
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                window.location.reload();
                            } else {
                                reset();
                            }
                        }}
                        style={{ width: '100%', padding: '14px', backgroundColor: '#00aeef', color: '#000000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '12px', border: 'none', cursor: 'pointer', marginBottom: '12px' }}
                    >
                        Reload Page
                    </button>
                    <a
                        href="tel:808-488-1111"
                        style={{ display: 'block', width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#38bdf8', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', boxSizing: 'border-box' }}
                    >
                        Call Office: (808) 488-1111
                    </a>
                </div>
            </body>
        </html>
    );
}
