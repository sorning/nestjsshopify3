export default function ProductCard({ product }) {
    const title = product.node.title
    // const imagesrc = product.node.imagesrc
    
    return (
        <>
            <p>productcard,{title}</p>
        </>
    )
}