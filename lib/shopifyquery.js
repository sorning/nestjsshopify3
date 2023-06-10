async function ShopifyFetch(query) {
    const response = await fetch(process.env.SHOPIFY_STORE_API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            // 'X-Shopify-Storefront-Access-Token': '364d4dbb32bc4c7f477d0be3c9b47d03',
        },
        body: JSON.stringify({query: query}),
    });
    const data =response.json();
    return data;
}



export async function getProductsInCollection() {
  const query = `
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
      }`
      ;

  const response = await ShopifyFetch(query);
  const allProducts = response.data.products.edges ? response.data.products.edges : [];
//   const allProducts = response.data.products.edges[0].node.images.edges[0].node.transformedSrc
  return allProducts;
}



    

           