'use client'

import { useTransition } from "react"
import { addToCart } from "./action"
import { addItem } from "@/app/(shopify)/1/shopify2/component/product/cart/actions"
import { useCookies } from "react-cookie"
// import addToCart from "./action"

// export default function Cart(){
//     const [isPending, startTransition]=useTransition()
//     return (
//         <>
//             <p>hi</p>
//             <button
//             onClick={()=>startTransition(()=>addToCart())}
//             >get cookie</button>
//         </>
//     )
// }


export default function Cart() {
    const [isPending, startTransition] = useTransition()
    return (
        <>
            <p>hi</p>
            <button
                onClick={() => startTransition(() => addItem())}
            >get cookie</button>
        </>
    )
}