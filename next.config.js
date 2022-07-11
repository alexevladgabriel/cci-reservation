/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/rezervare',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
