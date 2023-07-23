'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { addItem } from "./actions"
import clsx from "clsx"

export function AddToCart({
    variants,
    availableForSale=true
}) {
    const [selectedVariantId, setSelectedVariantId] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

  

    return (
        <>
            <button
                aria-label="Add item to cart"
                disabled={isPending}
                onClick={() => {
                    if (!availableForSale) return
                    startTransition(async () => {
                        const error = await addItem(selectedVariantId)

                        if (error) {
                            alert(error)
                            return
                        }

                        router.refresh()
                    })
                }}
                className={clsx(
                    'flex w-full items-center justify-center bg-black p-4 text-sm uppercase tracking-wide text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black',
                    {
                        'cursor-not-allowed opacity-60': !availableForSale,
                        'cursor-not-allowed': isPending
                    }
                )}
            >
                <span>{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
                {isPending ? <p>dots</p> : null}
            </button>
        </>
    )
}