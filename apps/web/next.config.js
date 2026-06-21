/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    output: process.platform === 'win32' ? undefined : 'standalone',
    experimental: {
        outputFileTracingRoot: path.join(__dirname, '../../'),
        cpus: 1,
        workerThreads: false,
        memoryBasedWorkersCount: true,
    },
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { dev }) => {
        // [HOTFIX for ENOSPC - Server Storage Critical]
        // Explicitly disable Webpack's disk cache layer on the production build 
        // to prevent Bluehost's 30GB VPS from maxing out during PackFileCacheStrategy.
        if (!dev) {
            config.cache = false;
        }
        return config;
    },

    trailingSlash: false,
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',

                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://js.stripe.com https://www.googletagmanager.com https://*.tctm.co; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob: https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://js.stripe.com; connect-src 'self' https: https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net http://staging.affordablehome-ac.com:8000 http://localhost:8000 http://localhost:8001 http://127.0.0.1:8000 http://127.0.0.1:8001",
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    async rewrites() {
        const apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
        console.log(`[Next.js Rewrites] Proxying to ${apiUrl}`);
        return [
            {
                source: '/api/v1/:path*',
                destination: `${apiUrl}/api/v1/:path*`,
            },
            {
                source: '/api/webhooks/stripe',
                destination: `${apiUrl}/api/webhooks/stripe`,
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/make-an-appointment',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/make-an-appointment/',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/cleaning-and-maintenance',
                destination: '/maintenance',
                permanent: true,
            },
            {
                source: '/cleaning-and-maintenance/',
                destination: '/maintenance',
                permanent: true,
            },
            {
                source: '/hawaii-energy-rebate',
                destination: '/shop#rebate',
                permanent: true,
            },
            {
                source: '/hawaii-energy-rebate/',
                destination: '/shop#rebate',
                permanent: true,
            },
            {
                source: '/product-tag/:path*',
                destination: '/shop',
                permanent: true,
            },
            {
                source: '/product-category/:path*',
                destination: '/shop',
                permanent: true,
            },
        ];
    },
};

// const { withSentryConfig } = require("@sentry/nextjs");

module.exports = nextConfig;

// module.exports = withSentryConfig(
//     nextConfig,
//     {
//         // For all available options, see:
//         // https://github.com/getsentry/sentry-webpack-plugin#options
//
//         // Suppresses source map uploading logs during build
//         silent: true,
//         org: "affordable-home-ac",
//         project: "javascript-nextjs",
//     },
//     {
//         // For all available options, see:
//         // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
//
//         // Upload a larger set of source maps for prettier stack traces (increases build time)
//         widenClientFileUpload: true,
//
//         // Transpiles SDK to be compatible with IE11 (increases bundle size)
//         transpileClientSDK: true,
//
//         // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
//         tunnelRoute: "/monitoring",
//
//         // Hides source maps from generated client bundles
//         hideSourceMaps: true,
//
//         // Automatically tree-shake Sentry logger statements to reduce bundle size
//         disableLogger: true,
//
//         // Enables automatic instrumentation of Vercel Cron Monitors.
//         // See the following for more information:
//         // https://docs.sentry.io/product/crons/
//         // https://vercel.com/docs/cron-jobs
//         automaticVercelMonitors: true,
//     }
// );

