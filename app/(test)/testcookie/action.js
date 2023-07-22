'use server'

import { cookies } from "next/headers"

// export default async function addToCart(){
//     const cartId=cookies().get('cartId')?.value

//     console.log('server action')
//     if(!cartId) {
//         return 'no cart id'
//     }else{
//         return 'get cookie'
//     }
// }
export const addToCart = async () => {
    const cartId = cookies().get('cartId')?.value

    console.log('server action')
    if (!cartId) {
        return 'no cart id'
    } else {
        return 'get cookie'
    }
}