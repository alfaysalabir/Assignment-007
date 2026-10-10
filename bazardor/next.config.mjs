/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api-data/:path*",
                destination: "https://api.api-store.workers.dev/api/bazardor/:path*",
            },
            {
                source: "/api-data-2/:path*",
                destination: "https://api.abcz.workers.dev/api/bazardor/:path*",
            },
        ];
    },
};

export default nextConfig;