/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.shopify.com','tailwindui.com'],
    },
    experimental: {
        serverActions: true
    }, 
}

module.exports = nextConfig


