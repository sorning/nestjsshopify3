'use client'

import { usePathname } from "next/navigation"

export default function UsePathname1() {
    const pathname=usePathname()

    return (
        <>
            <p>current pathname: {pathname}</p>
        </>
    )
}