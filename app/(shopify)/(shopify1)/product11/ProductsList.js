// 'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { getAllProductsInCollection, queryProducts, queryProductsV1, shopifyFetch } from "@/lib/shopifyQueryV2"
import Link from "next/link"
import FormatPrice from "@/lib/shopify/formatPrice"

const products1 = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]
export default async function ProductsList() {
  //可以尝试用这种方法
  // const productsData = await shopifyFetch(queryProductsV1);
  // const products=productsData.data.products.edges

  // const allProducts = response.data.products.edges ? response.data.products.edges : []
  const productsData = await getAllProductsInCollection()
  const products = productsData

  return (
    <>
      {/* <div className="bg-white"> */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              //link里面的内容可以让href直接跳转到产品页面
              <Link key={product.node.handle} href={`/product/${product.node.handle}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.node.images.edges[0].node.transformedSrc}
                    alt={product.node.images.edges[0].node.altText}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex justify-between">
                  <h3 className="mt-4 text-m text-gray-400">{product.node.title}</h3>
                  <p className="mt-4 text-lg font-medium text-gray-600">{FormatPrice(product.node.priceRange.minVariantPrice.amount)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
