import { Suspense } from "react"
import { ThreeItemGrid } from "../component/grid/three-items"
import { Carousel } from "../component/carousel"
import Footer from "../component/layout/footer"

export const runtime = 'edge'

export const metadata = {
    description: 'Shopify Nextjs Powered by SN',
    openGraph: {
        images: [
            {
                url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
                width: 1200,
                height: 630,
            }
        ],
        type: 'website'
    }
}

export default function HomePage() {
    return (
        <>
            <ThreeItemGrid />
            <Suspense>
                <Carousel />
                <Suspense>
                    <Footer />
                </Suspense>
            </Suspense>
            <h1>hello world.</h1>
        </>
    )
}