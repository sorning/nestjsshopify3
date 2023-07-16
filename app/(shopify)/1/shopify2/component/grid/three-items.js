import Link from "next/link";
import { GridTileImage } from "./tile";
import { getCollectionProducts } from "../../lib/shopify";

function ThreeItemGridItem({
    item,
    size,
    background,
}) {
    return (
        <div
            className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
        >
            <Link href={`/product/${item.handle}`} className="block h-full">
                
                    <GridTileImage
                        src={item.featuredImage.url}
                        width={size === 'full' ? 1080 : 540}
                        height={size === 'full' ? 1080 : 540}
                        priority={true}
                        background={background}
                        alt={item.title}
                        labels={{
                            title: item.title,
                            amount: item.priceRange.maxVariantPrice.amount,
                            currencyCode: item.priceRange.maxVariantPrice.currencyCode
                        }}
                    />
                
            </Link>
        </div>
    )
}

export async function ThreeItemGrid() {
    const homepageItems = await getCollectionProducts({
        collection: 'crystal'
    })
    //console homepageItems
    // console.log(homepageItems)
    if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null

    const [firstProduct, secondProduct, thirdProduct] = homepageItems

    return (
        <section className="lg:grid lg:grid-cols-6 lg:grid-rows-2" data-testid="homepage-products">
            <ThreeItemGridItem size='full' item={firstProduct} background='purple' />
            <ThreeItemGridItem siez='half' item={secondProduct} background='black' />
            <ThreeItemGridItem siez='half' item={thirdProduct} background='pink' />
        </section>
    )
}