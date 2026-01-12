/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    optimizeFonts: false,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com; connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 ws://localhost:3000 https:;",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
