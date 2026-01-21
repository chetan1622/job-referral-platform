/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // Commented out for Netlify compatibility
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['images.unsplash.com', 'github.com'],
    },
};

export default nextConfig;
