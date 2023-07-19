'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import Link from "next/link"

export default function ExampleClientComponent() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
   
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
   
        return params.toString()
      },
      [searchParams]
    )
   
    return (
      <>
        <p>Sort By</p>
   
        {/* using useRouter */}
        <button
          onClick={() => {
            // <pathname>?sort=asc
            router.push(pathname + '?' + createQueryString('sort', 'asc'))
            router.push(pathname + '/' + 'hello' +'?' + createQueryString('sort', 'asc'))
          }}
        >
          ASC
        </button>
   
        {/* using <Link> */}
        <Link
          href={
            // <pathname>?sort=desc
            pathname + '?' + createQueryString('sort', 'desc')
          }
        >
          DESC
        </Link>
      </>
    )
  }