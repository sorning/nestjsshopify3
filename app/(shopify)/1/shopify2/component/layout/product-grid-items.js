import Link from "next/link";
import Grid from "../grid";
import { GridTileImage } from "../grid/tile";

export default function ProductGridItems({ products }) {
    return (
        <>
            {products.map((product) => (
                <Grid.Item key={product.handle} className='animate-fadeIn' >
                    {/* set to our own path */}
                    <Link href={`/1/shopify2/apps/product/${product.handle}`} className="h-full w-full">
                        <GridTileImage
                            alt={product.title}
                            labels={{
                                isSmall: true,
                                title: product.title,
                                amount: product.priceRange.maxVariantPrice.amount,
                                currencyCode: product.priceRange.maxVariantPrice.currencyCode
                            }}
                            src={product.featuredImage?.url}
                            width={600}
                            height={600}
                        />
                    </Link>
                </Grid.Item>
            ))}
        </>
    )
}