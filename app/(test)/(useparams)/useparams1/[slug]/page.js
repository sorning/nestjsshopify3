'use client'

import { useParams, usePathname, useSearchParams } from "next/navigation"

export default function UseParams1({params}) {
    const paramss=useParams()
    const pathname=usePathname()
    const searchparams=useSearchParams()

    console.log('params :', paramss)

    console.log('search params :', searchparams)

    return (
        <>
        <p>current pathname:{pathname}</p>
        {/* <p>current params:{paramss}</p> */}
        </>
    )
} 