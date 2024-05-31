/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
    },
};

export default nextConfig;
