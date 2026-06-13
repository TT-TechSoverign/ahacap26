'use client';

import { useEffect } from 'react';

export default function DeferredAnalytics() {
    useEffect(() => {
        // Prevent running on server side or if already loaded
        if (typeof window === 'undefined') return;

        let loaded = false;

        const loadAnalytics = () => {
            if (loaded) return;
            loaded = true;

            try {
                // Ensure dataLayer is initialized
                // @ts-ignore
                window.dataLayer = window.dataLayer || [];

                // 1. Load Google Tag Manager
                (function(w,d,s,l,i){
                    // @ts-ignore
                    w[l]=w[l]||[];
                    // @ts-ignore
                    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s) as HTMLScriptElement,
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode?.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KTZ58FJX');

                // 2. Load Google Analytics gtag.js
                const gaScript = document.createElement('script');
                gaScript.async = true;
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MYJZTZFXQV';
                document.head.appendChild(gaScript);

                gaScript.onload = () => {
                    // @ts-ignore
                    window.dataLayer = window.dataLayer || [];
                    // @ts-ignore
                    function gtag(){window.dataLayer.push(arguments);}
                    // @ts-ignore
                    gtag('js', new Date());
                    // @ts-ignore
                    gtag('config', 'G-MYJZTZFXQV', {
                        page_path: window.location.pathname,
                    });
                };
            } catch (error) {
                console.error('[DeferredAnalytics] Failed to load analytics:', error);
            }

            // Clean up event listeners immediately after loading
            removeListeners();
        };

        const removeListeners = () => {
            window.removeEventListener('scroll', loadAnalytics);
            window.removeEventListener('mousemove', loadAnalytics);
            window.removeEventListener('touchstart', loadAnalytics);
            window.removeEventListener('keydown', loadAnalytics);
        };

        // Add event listeners for interaction
        window.addEventListener('scroll', loadAnalytics, { passive: true });
        window.addEventListener('mousemove', loadAnalytics, { passive: true });
        window.addEventListener('touchstart', loadAnalytics, { passive: true });
        window.addEventListener('keydown', loadAnalytics, { passive: true });

        // Fallback timeout to load analytics after 3.5 seconds if no interaction
        const timeoutId = setTimeout(loadAnalytics, 3500);

        return () => {
            clearTimeout(timeoutId);
            removeListeners();
        };
    }, []);

    return null;
}
