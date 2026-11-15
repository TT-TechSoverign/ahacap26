const fs = require('fs');
const path = require('path');

const webDir = __dirname;
process.chdir(webDir);

const postcss = require(require.resolve('postcss', { paths: [webDir] }));
const tailwindcss = require(require.resolve('tailwindcss', { paths: [webDir] }));
const autoprefixer = require(require.resolve('autoprefixer', { paths: [webDir] }));
const cssnano = require(require.resolve('next/dist/compiled/cssnano-simple', { paths: [webDir] }));

async function buildCriticalInlineCss() {
    // Minimal base + font-face + above-the-fold Tailwind input (full globals.css with animations loads async right behind!)
    const criticalCssInput = `
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url('/assets/fonts/inter.woff2') format('woff2');
}
@font-face {
    font-family: 'Inter Fallback';
    src: local('Arial');
    ascent-override: 90%;
    descent-override: 22%;
    line-gap-override: 0%;
    size-adjust: 107%;
}
@font-face {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 200 700;
    font-display: swap;
    src: url('/assets/fonts/oswald.woff2') format('woff2');
}
@font-face {
    font-family: 'Oswald Fallback';
    src: local('Arial Narrow'), local('Arial');
    ascent-override: 118%;
    descent-override: 28%;
    line-gap-override: 0%;
    size-adjust: 82%;
}
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 11, 17, 32;
    --background-end-rgb: 11, 17, 32;
}
html {
    background-color: #0b1120;
    color: #ffffff;
    scroll-padding-top: 104px;
}
@media (min-width: 768px) {
    html { scroll-padding-top: 192px; }
}
body {
    color: rgb(var(--foreground-rgb));
    background-color: rgb(var(--background-start-rgb));
}
html, body {
    overflow-x: clip;
    max-width: 100vw;
    width: 100%;
}
.cv-auto {
    content-visibility: auto;
    contain-intrinsic-size: auto 700px;
}
.scrollbar-none, .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar, .no-scrollbar::-webkit-scrollbar {
    display: none;
}
`;

    const criticalTailwindConfig = {
        darkMode: 'class',
        future: { hoverOnlyWhenSupported: true },
        content: [
            './app/layout.tsx',
            './app/page.tsx',
            './components/MobileStickyHeader.tsx',
            './components/NavbarV2.tsx',
            './components/Section1HeroHomeV2.tsx',
            './components/QuickJumpBanner.tsx',
            './components/EditableText.tsx',
            './components/ProtectedEmailLink.tsx',
        ],
        safelist: [
            'pt-[92px]', 'pt-[96px]', 'pt-20', 'md:pt-[180px]', 'md:pt-[192px]',
            'bg-[#05070a]', 'bg-[#050914]', 'bg-[#060a12]', 'min-h-screen',
            'text-slate-200', 'pb-24', 'mb-8', 'mb-10',
        ],
        theme: {
            extend: {
                colors: {
                    primary: '#00AEEF',
                    accent: '#39B54A',
                    'background-light': '#f5f8f8',
                    'background-dark': '#0b1120',
                    'surface-dark': '#161b22',
                    'border-dark': '#2d333b',
                    charcoal: '#1a1f2e',
                    'navy-deep': '#0b1120',
                    'navy-matte': '#0f172a',
                    navy: {
                        900: '#0f172a',
                        950: '#020617',
                        DEFAULT: '#0b1120',
                    },
                },
                fontFamily: {
                    display: ['Inter', 'Inter Fallback', 'system-ui', '-apple-system', 'sans-serif'],
                    header: ['Oswald', 'Oswald Fallback', 'Arial Narrow', 'sans-serif'],
                    sans: ['Inter', 'Inter Fallback', 'system-ui', '-apple-system', 'sans-serif'],
                },
                borderRadius: {
                    DEFAULT: '0.25rem',
                    lg: '0.5rem',
                    xl: '0.75rem',
                    full: '9999px',
                },
                boxShadow: {
                    glow: '0 0 20px rgba(0, 174, 239, 0.15)',
                },
            },
        },
        plugins: [],
    };

    const result = await postcss([
        tailwindcss(criticalTailwindConfig),
        autoprefixer(),
        cssnano({ excludeAll: false }, postcss),
    ]).process(criticalCssInput, { from: path.join(webDir, 'app/globals.css') });

    const safeCss = result.css.replace(/<\/style/gi, '<\\/style');
    const outTs = `// Auto-generated critical above-the-fold CSS by generate-inline-css.cjs during prebuild — DO NOT EDIT MANUALLY\nexport const INLINE_GLOBAL_CSS = ${JSON.stringify(safeCss)};\n`;
    const outPath = path.join(webDir, 'app/generated-global-css.ts');
    fs.writeFileSync(outPath, outTs, 'utf8');
    console.log(`[generate-inline-css] Wrote ${safeCss.length} bytes of critical above-the-fold CSS to app/generated-global-css.ts`);
}

buildCriticalInlineCss().catch((err) => {
    console.error('[generate-inline-css] Failed:', err);
    process.exit(1);
});
