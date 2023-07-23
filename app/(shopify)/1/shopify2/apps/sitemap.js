import { getCollections, getPages, getProducts } from "../lib/shopify";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export default async function sitemap() {
    const routesMap = [''].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString()
    }))

    const collectionPromise = getCollections().then((collections) => collections.map((collection) => ({
        url: `${baseUrl}${collection.path}`,
        lastModified: collection.updatedAt
    })))

    const productsPromise = getProducts({}).then((products) => products.map((product) => ({
        url: `${baseUrl}/product/${product.handle}`,
        lastModified: product.updatedAt
    })))

    const pagesPromise = getPages().then((pages) => pages.map((page) = ({
        url: `${baseUrl}/${page.handle}`,
        lastModified: page.updatedAt
    })))

    const fetchedRoutes=(
        await Promise.all([collectionPromise,productsPromise,pagesPromise])
    ).flat()

    return [...routesMap, ...fetchedRoutes]
}