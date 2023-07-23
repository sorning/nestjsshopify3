'use client'

import { createUrl } from "../../../../lib/shopify/utils";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

function PahtFilterItem({ item }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [active, setActive] = useState(pathname === item.path)
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.delete('q')

    useEffect(() => {
        setActive(pathname === item.path)
    }, [pathname, item.path])

    return (
        <>
            <li className="mt-2 flex text-sm text-gray-400" key={item.title}>
                <Link
                    href={createUrl(item.path, newParams)}
                    className={clsx('w-full hover:text-gray-800 dark:hover:text-gray-100', {
                        'text-gray-600 dark:text-gray-400': !active,
                        'font-semibold text-black dark:text-white': active
                    })}
                >
                    {item.title}
                </Link>
            </li>
        </>
    )
}

//sortfilteritem ts lib/contant
function SortFilterItem({ item }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [active, setActive] = useState(searchParams.get('sort') === item.slug)
    const q = searchParams.get('q')

    useEffect(() => {
        setActive(searchParams.get('sort') === item.slug)
    }, [searchParams, item.slug])

    const href = item.slug && item.slug.length ? createUrl(pathname, new URLSearchParams({ ...(q && { q }), sort: item.slug })) : pathname

    return (
        <>
            <li className="mt-2 flex text-sm text-gray-400" key={item.title}>
                <Link
                    href={href}
                    prefetch={false}
                    className={clsx('w-full hover:text-gray-800 dark:hover:text-gray-100', {
                        'text-gray-600 dark:text-gray-400': !active,
                        'font-semibold text-black dark:text-white': active
                    })}
                >
                    {item.title}
                </Link>
            </li>
        </>
    )
}

export function FilterItem({ item }) {
    return 'path' in item ? <PahtFilterItem item={item} /> : <SortFilterItem item={item} />
}