import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT,TAGS } from "./constants";
import { getProductQuery } from "./queries/product";
import {
    getCollectionQuery,
    getCollectionsQuery,
    getCollectionProductsQuery
} from './queries/collection'
import { getMenuQuery } from "./queries/menu";

const endpoint = `https://${process.env.SHOPIFY_DOMAIN}.myshopify.com/api/2023-01/graphql.json`
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const domain=`https://${process.env.SHOPIFY_DOMAIN}`

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

const reshapeProduct=(product, filterHiddenProducts=true)=>{
    if(!product || (filterHiddenProducts&&product.tags.includes(HIDDEN_PRODUCT_TAG))) {
        return undefined
    }

    const {images, variants, ...rest}=product

    return {
        ...rest,
        images:removeEdgesAndNodes(images),
        variants:removeEdgesAndNodes(variants)
    }
}

const reshapeProducts=(products)=>{
    const reshapedProducts=[]

    for (const product of products){
        if (product) {
            const reshapedProduct=reshapeProduct(product)

            if(reshapedProduct){
                reshapedProducts.push(reshapedProduct)
            }
        }
    }

    return reshapedProducts
}

export async function getCollectionProducts({collection,reverse,sortKey}) {
    const res=await shopifyFetch({
        query:getCollectionProductsQuery,
        tags:[TAGS.collections,TAGS.products],
        variables:{
            handle:collection,
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

export async function getMenu(handle) {
    const res=await shopifyFetch({
        query: getMenuQuery,
        tags:[TAGS.collections],
        variables:{
            handle
        }
    })
    return (
        res.body?.data?.menu?.items.map((item)=>({
            title:item.title,
            path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages','')
        })) || []
    )
}