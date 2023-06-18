import Footer from "@/components/layout/footer/footer";
import Navbars from "@/components/layout/navbar/navbar";
import Image from "next/image";

export default async function shopify1() { 
    const query1=`
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
      async function shopifyFetch(query) {
        const response = await fetch(process.env.SHOPIFY_STORE_API_URL,{
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({query:query})
        })
        const data = response.json()
        return data;
      }
      const productdata= await shopifyFetch(query1);
      const title1=productdata.data.products.edges[0]
    return (
        <>
            <Navbars />
            <div>
                <p>title{title1.node.title1}</p>
                <p>transformedsrc{title1.node.images.edges[0].node.transformedSrc}</p>
                <Image 
                width={500}
                height={500}
                src={title1.node.images.edges[0].node.transformedSrc} />
            </div>
            <Footer />
        </>
    )
} 