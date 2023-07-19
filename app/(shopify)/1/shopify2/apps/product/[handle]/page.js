import { notFound } from "next/navigation"
import { getProduct } from "../../../lib/shopify"
import { HIDDEN_PRODUCT_TAG } from "../../../lib/shopify/constants"
import { Gallery } from "../../../component/product/gallery"
import { VariantSelector } from "../../../component/product/variant-selector"
import Prose from "../../../component/prose"

export const runtime = 'edge'

export async function generateMetadata({ params }) {
    const product = await getProduct(params.handle)

    if (!product) return notFound

    const { url, width, height, altText: alt } = product.featuredImage || []
    const hide = !product.tags.includes(HIDDEN_PRODUCT_TAG)

    return {
        title: product.seo.title || product.title,
        description: product.seo.description || product.description,
        robots: {
            index: hide,
            follow: hide,
            googleBot: {
                index: hide,
                follow: hide,
            }
        },
        openGraph: url
            ? {
                images: [
                    {
                        url,
                        width,
                        height,
                        alt,
                    }
                ]
            }
            : null
    }
}

export default async function ProductPage({ params }) {
    const product = await getProduct(params.handle)

    if (!product) return notFound

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.featuredImage.url,
        offers: {
            '@type': 'AggregateOffer',
            availability: product.availableForSale
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            priceCurrency: product.priceRange.minVariantPrice.currencyCode,
            highPrice: product.priceRange.maxVariantPrice.amount,
            lowPrice: product.priceRange.minVariantPrice.amount
        }
    }
    return (
        <>
            <div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(productJsonLd)
                    }}
                />
                <div className="lg:grid lg:grid-cols-6">
                    <div className="lg:col-span-4">
                        <Gallery 
                        title={product.title}
                        amount={product.priceRange.maxVariantPrice.amount}
                        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                        images={product.images.map((image)=>({
                            src: image.url,
                            altText: image.altText
                        }))}
                        />
                    </div>
                    <div className="p-6 lg:col-span-2">
                        <VariantSelector options={product.options} variants={product.variants} />

                        {product.descriptionHtml ? (
                            <Prose className='mb-6 text-sm leading-tight' html={product.descriptionHtml} />
                        ):null}
                    
                    </div>
                </div>
            </div>
        </>
    )
}