import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "./constants";
import { getProductQuery, getProductRecommendationsQuery, getProductsQuery } from "./queries/product";
import {
    getCollectionQuery,
    getCollectionsQuery,
    getCollectionProductsQuery
} from './queries/collection'
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from "./mutations/cart";
import { getCartQuery } from "./queries/cart";

const endpoint = `https://${process.env.SHOPIFY_DOMAIN}.myshopify.com/api/2023-01/graphql.json`
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const domain = `https://${process.env.SHOPIFY_DOMAIN}`

async function shopifyFetch({
    cache = 'force-cache',
    headers,
    query,
    tags,
    variables
}) {
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } })
        })

        const body = await result.json()

        if (body.errors) {
            throw body.errors[0]
        }

        return {
            status: result.status,
            body
        }
    } catch (e) {
        throw e.message,
        query
    }
}

const removeEdgesAndNodes = (array) => {
    return array.edges.map((edge) => edge?.node)
}

const reshapeCart = (cart) => {
    if (!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: '0.0',
            currencyCode: 'USD'
        }
    }

    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines)
    }
}

const reshapeCollection = (collection) => {
    if (!collection) {
        return undefined
    }
    return {
        ...collection,
        path: `/search/${collection.handle}`
    }
}

const reshapeCollections = (collections) => {
    const reshapedCollections = []

    for (const collection of collections) {
        if (collection) {
            const reshapedCollection = reshapeCollection(collection)

            if (reshapedCollections) {
                reshapedCollections.push(reshapedCollection)
            }
        }
    }

    return reshapedCollections
}

const reshapeProduct = (product, filterHiddenProducts = true) => {
    if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
        return undefined
    }

    const { images, variants, ...rest } = product

    return {
        ...rest,
        images: removeEdgesAndNodes(images),
        variants: removeEdgesAndNodes(variants)
    }
}

const reshapeProducts = (products) => {
    const reshapedProducts = []

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product)

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct)
            }
        }
    }

    return reshapedProducts
}

export async function createCart() {
    const res = await shopifyFetch({
        query: createCartMutation,
        cache: 'no-store',
    })

    return reshapeCart(res.body.data.cartCreate.cart)
}

export async function addToCart(cartId, lines) {
    const res = await shopifyFetch({
        query: addToCartMutation,
        variables: {
            cartId,
            lines,
        },
        cache: 'no-store'
    })

    return reshapeCart(res.body.data.cartLinesAdd.cart)
}

export async function removeFromCart(cartId, lineIds) {
    const res = await shopifyFetch({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds,
        },
        cache: 'no-store',
    })

    return reshapeCart(res.body.data.cartLinesRemove.cart)
}

export async function updateCart(cartId, lines) {
    const res = await shopifyFetch({
        query: editCartItemsMutation,
        variables: {
            cartId,
            lines,
        },
        cache: 'no-store'
    })

    return reshapeCart(res.body.data.cartLinesUpdate.cart)
}

export async function getCart(cartId) {
    const res = await shopifyFetch({
        query: getCartQuery,
        variables: { cartId },
        cache: 'no-store'
    })

    if (!res.body.data.cart) {
        return null
    }

    return reshapeCart(res.body.data.cart)
}

export async function getCollection(handle) {
    const res = await shopifyFetch({
        query: getCollectionQuery,
        tags: [TAGS.collections],
        variables: {
            handle
        }
    })

    return reshapeCollection(res.body.data.collection)
}

export async function getCollectionProducts({ collection, reverse, sortKey }) {
    const res = await shopifyFetch({
        query: getCollectionProductsQuery,
        tags: [TAGS.collections, TAGS.products],
        variables: {
            handle: collection,
            reverse,
            sortKey,
        }
    })

    if (!res.body.data.collection) {
        console.log(`No collection found for \`${collection}\``)
        return []
    }

    return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products))
}

export async function getCollections() {
    const res = await shopifyFetch({
        query: getCollectionsQuery,
        tags: [TAGS.collections]
    })

    const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections)
    const collections = [
        {
            handle: '',
            title: 'All',
            description: 'All products',
            seo: {
                title: 'All',
                description: 'All products'
            },
            path: '/search',
            updatedAt: new Date().toISOString()
        },
        // Filter out the `hidden` collections.
        // Collections that start with `hidden-*` need to be hidden on the search page.
        ...reshapeCollections(shopifyCollections).filter((collection)=>!collection.handle.startsWith('hidden'))
    ]

    return collections
}

export async function getMenu(handle) {
    const res = await shopifyFetch({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle
        }
    })
    return (
        res.body?.data?.menu?.items.map((item) => ({
            title: item.title,
            path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
        })) || []
    )
}

export async function getPage(handle) {
    const res = await shopifyFetch({
        query: getPageQuery,
        variables: { handle }
    })

    return res.body.data.pageByHandle
}

export async function getPages() {
    const res = await shopifyFetch({
        query: getPagesQuery,
    })

    return removeEdgesAndNodes(res.body.data.pages)
}

export async function getProduct(handle) {
    const res = await shopifyFetch({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            handle
        }
    })

    return reshapeProduct(res.body.data.product, false)
}

export async function getProductRecommendations(productId) {
    const res = await shopifyFetch({
        query: getProductRecommendationsQuery,
        tags: [TAGS.products],
        variables: {
            productId
        }
    })

    return reshapeProducts(res.body.data.getProductRecommendations)
}

export async function getProducts({ query, reverse, sortKey }) {
    const res = await shopifyFetch({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey,
        }
    })

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products))
}