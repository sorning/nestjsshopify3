'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import LoadingDots from "../../loading-dots"

export function AddToCart({
    variants,
    availableForSale
}) {
    const [selectedVariantId, setSelectedVariantId]=useState(variants[0]?.id)
    const router= useRouter()
    const searchParams=useSearchParams()
    const [isPending, startTransition]=useTransition()

    useEffect(()=>{
        const variant=variants.find((variant)=>variant.selectedOptions.every((option)=>option.value===searchParams.get(option.name.toLowerCase())))

        if(variant){
            setSelectedVariantId(variant.id)
        }
    },[searchParams, variants, setSelectedVariantId])

    return (
        <>
            <button
            aria-label="Add item to cart"
            disabled={isPending}
            onClick={()=>{
                if(!availableForSale) return
                startTransition(async ()=>{
                    
                })
            }}
            >
                <span>{availableForSale?'Add To Cart':'Out Of Stock'}</span>
                {isPending?<LoadingDots className='bg-white dark:bg-black'/>:null}
            </button>
        </>
    )
}