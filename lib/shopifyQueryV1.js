export const shopifyFetch = async (query) => {
    const response = await fetch(process.env.SHOPIFY_STORE_API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({query:query})
    })
    const data=response.json()
    return data
}

export const queryProducts=`
query Products {
    products(first: 6) {
      edges {
        node {
          handle
          images(first: 6) {
            edges {
              node {
                altText
                transformedSrc
              }
            }
          }
          title
          tags
        }
      }
    }
  }
`
export const queryProductsV1=`
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