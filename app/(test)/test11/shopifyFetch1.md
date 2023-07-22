const endpoint=`https://${process.env.SHOPIFY_DOMAIN}myshopify.com/api/2023-01/graphql.json`
const key=process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const domain=`https://${process.env.SHOPIFY_DOMAIN}`

async function shopifyFetch({
    headers,
    query,
    variables,
    tags,
    cache='force-cache'
}){
    try {
        const result=await fetch(endpoint,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-Shopify-Storefront-Access-Token':key,
                ...headers,
            },
            body:JSON.stringify({
                ...(query&&{query}),
                ...(variables&&{variables})
            }),
            cache,
            ...(tags&&{next:{tags}})
        })

        const body=await result.json()

        if(body.errors) {
            throw body.errors[0]
        }

        return {
            status: result.status,
            body
        }
    } catch(e) {
        throw e.message,
        query
    }  
}

const removeEdgesAndNodes=(array)=>{
    return array.edges.map((edge)=>edge?.node)
}