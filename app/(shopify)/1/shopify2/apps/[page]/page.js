import { notFound } from "next/navigation"
import { getPage } from "../../lib/shopify"
import Prose from "../../component/prose"

export const runtime='edge'

export const revalidate=43200

export async function generateMetadata({params}) {
    const page=await getPage(params.page)

    if(!page) return notFound()

    return {
        title:page.seo?.title || page.title,
        description: page.seo?.description || page.bodySummary,
        openGraph: {
            images:[
                {
                    url:`/api/og?title=${encodeURIComponent(page.title)}`,
                    width:1200,
                    height: 630,
                }
            ],
            publishedTime: page.createdAt,
            modifiedTime:page.updatedAt,
            type:'article'
        }
    }
}

export default async function Page({params}) {
    const page=await getPage(params.page);

    if (!page) return notFound()

    return (
        <>
            <h1 className="mb-8 text-5xl font-bold">{page.title} </h1>
            <Prose className='mb-8' html={page.body} />
            <p className="text-sm italic">
                {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(new Date(page.updatedAt))}.`}
            </p>
        </>
    )
}