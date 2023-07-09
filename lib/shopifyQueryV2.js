export const shopifyFetch = async (query, variables) => {
    // const fecthUrl = `https://${process.env.SHOPIFY_DOMAIN}.myshopify.com/api/2023-01/graphql.json`
    const fecthUrl = `https://willingwater.myshopify.com/api/2023-01/graphql.json`
    const fetchOptions = {
        endpoint: fecthUrl,
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
        mode: 'no-cors',
    }
    try {
        const response = await fetch(fecthUrl, fetchOptions)
        const data = response.json()
        // console.log(data)
        return data
    } catch (error) { error }
}

export const getAllProductsInCollection = async () => {
    const query = `
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
    console.log('getallproducts')
    const response = await shopifyFetch(query)
    const allProducts = response.data.products.edges ? response.data.products.edges : []
    // const allProducts = response.data.products.edges || [];
    return allProducts
}

export const getSingleProduct = async (handle) => {
    //加tags updateat 会报错
    console.log('getsingleproduct')
    console.log(handle)
    const query = `
    query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 4) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    `
    // const query = `
    // query ProductByHandle {
    //     productByHandle(handle: "amazonite-gravel") {
    //       id
    //       title
    //       handle
    //       description
    //       priceRange {
    //         minVariantPrice {
    //           amount
    //           currencyCode
    //         }
    //       }
    //       images(first: 4) {
    //         edges {
    //           node {
    //             transformedSrc
    //             altText
    //           }
    //         }
    //       }
    //     }
    //   }
    // `
    // const query=`
    // query singleProduct {
    //     productByHandle(handle: "amazonite-gravel") {
    //       title
    //       tags
    //       description
    //       updatedAt
    //       priceRange {
    //         minVariantPrice {
    //           amount
    //         }
    //       }
    //       images(first: 4) {
    //         edges {
    //           node {
    //             transformedSrc
    //             altText
    //           }
    //         }
    //       }
    //     }
    //   }

    // `
    // const query=`
    // query singleProduct($handle:String!) {
    //     productByHandle(handle: $handle) {
    //       title
    //       tags
    //       description
    //       updatedAt
    //       priceRange {
    //         minVariantPrice {
    //           amount
    //         }
    //       }
    //       images(first: 4) {
    //         edges {
    //           node {
    //             transformedSrc
    //             altText
    //           }
    //         }
    //       }
    //     }
    //   }

    // `
    // const variables = { handle }
    // console.log(variables)
    try {
        const variables = { handle }
        console.log('variables')
        console.log(variables)
        // const response=await shopifyFetch({query:query,variables:{handle}})
        // const response=await shopifyFetch(query,variables.handle)

        //！！！再次用fetch虽然烦琐，但不会出乱子。
        const response=await fetch(`https://willingwater.myshopify.com/api/2023-01/graphql.json`,{
            // endpoint: fecthUrl,
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({ query, variables }),
            mode: 'no-cors',
        })
        const data=await response.json()
        const product=data.data.productByHandle
        //???
        // const response = await shopifyFetch(query)
        console.log(data)
        console.log('shopifyfetch')
        // const product = response.data.productByHandle || []
        // console.log(response)
        return product
    } catch (error) {
        throw error
    }
}

export const queryProducts = `
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
export const queryProductsV1 = `
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

export const singleProductQuery = `
query singleProduct($handle:String!) {
    productByHandle(handle: $handle) {
      title
      tags
      description
      updatedAt
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 4) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
    }
  }
  
`