import ProductCard from "@/components/ProductCard";
import ProductList from "@/components/ProductList";
import { getProductsInCollection } from "@/lib/shopifyquery";

export default function About({products}) {
    // console.log(products);
    return (
        <>
            <p>About</p>
            <ProductList products={products} />
        </>
    )
}




export async function getStaticProps() {
    const products = await getProductsInCollection()

    return {
        props: {
            products,
        },
    }
}
  

  
