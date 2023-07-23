import { notFound } from "next/navigation";
import { getCollection, getCollectionProducts } from "../../../lib/shopify";
import { defaultSort, sorting } from "../../../lib/shopify/constants";
import Grid from "../../../component/grid";
import ProductGridItems from "../../../component/layout/product-grid-items";

// export default runtime='edge'

export async function generateMetadata({ params }) {
    const collection = await getCollection(params.collection)

    if (!collection) return notFound

    return {
        title: collection.seo?.title || collection.title,
        description: collection.seo?.description || collection.description || `${collection.title} products`
    }
}

export default async function CategoryPage({
    params,
    searchParams
}) {
    const { sort } = searchParams 
    const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort
    const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse })

    return (
        <section>
            {products.length === 0 ? (
                <p className="py-3 text-lg">{`No products found in this collection`}</p>
            ) : (
                <Grid className='gird-cols-2 lg:grid-cols-3'>
                    <ProductGridItems products={products} />
                </Grid>
            )}
        </section>
    )
}