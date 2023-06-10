import ProductCard from "./ProductCard";

export default function ProductList({products}) {
    return (
        <>
            <p>product list</p>
            {
                products.map((product, index)=>(
                    <ProductCard key={index} product={product} />
                ))
            }
        </>
    )
}