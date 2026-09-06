const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.platform === 'win32' ? undefined : 'standalone',
    basePath: '/dev-os',
    experimental: {
        outputFileTracingRoot: path.join(__dirname, '../../'),
        cpus: 1,
        workerThreads: false,
    },
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
