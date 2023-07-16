const shopifyfetch=async ({headers, query,tags,variables})=>{

   
    try {
        const result = await fetch('https://willingwater.myshopify.com/api/2023-01/graphql.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache:'no-cache',
            ...(tags && { next: { tags } })
        })

        const body = await result.json()
        
        return body
    } catch (e) {throw e}

    
}
export default async function HomePage() {
    const query1=`
    query products {
        products(first: 10) {
          edges {
            node {
              id
              images(first: 1) {
                edges {
                  node {
                    altText
                    transformedSrc
                  }
                }
              }
              title
              handle
              tags
              priceRange {
                minVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    `

    const query2=`
    {
        collections(first: 3) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `
    const data=await shopifyfetch({query:query2})
    console.log('fetching')
    console.log(data.data.collections.edges[1])
    return (
        <>
            {/* <ThreeItemGrid />
            <Suspense>
                <Carousel />
                <Suspense>
                    <Footer />
                </Suspense>
            </Suspense> */}
            <h1>hii</h1>
           
        </>
    )
}