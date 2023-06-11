// import { fragment } from 'react';
import Navbar from "../../components/layout/navbar/navbar";
import Footer from "../../components/layout/footer/footer";
// import About from "@/pages/graph";
import { ShopifyFetch } from "@/lib/shopifyquery";
import Image from "next/image";

export default async function Home() {
    const query1 = `
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
    const data = await ShopifyFetch(query1);

    const title1 = data.data.products.edges[0];

    return (
        <>
            <Navbar />
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>hello world. {title1.node.title}</p>
                    <p>hello world. {title1.node.images.edges[0].node.transformedSrc}</p>
                    <Image 
                        // src = {title1.node.images.edges[0].node.transformedSrc}
                        src = 'https://cdn.shopify.com/s/files/1/0421/0242/3709/products/AmazoniteGravel1.jpg?v=1603792822'
                        width={500}
                        height={500}
                        alt='hi'
                    />
                </div>
            <Footer />
        </>
    )
}