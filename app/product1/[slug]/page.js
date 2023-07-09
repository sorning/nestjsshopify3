// export async function generateStaticParams() {
//     const products = await fetch('https://.../posts').then((res)=>res.json())
//     return products.map((product)=>({
//         slug:product.slug,
//     }))
// }
export default function ProductPage({params}) {
    return (
        <>
        <div>My Product: {params.slug}</div>
        </>
    )
}