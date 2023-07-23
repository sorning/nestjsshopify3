'use server'

import { cookies } from 'next/headers'
// import { addToCart, removeFromCart, updateCart } from '../../../lib/shopify'

export const addItem = async (variantId) => {

    const cartId = cookies().get('cartId')?.value
    cookies().set('nextcookie','lee')
    cookies().set({
        name:'cartId',
        value:'shopifycartid',
        httpOnly:true,
        path:'/',
    })
    cookies().set({
        name:'cartId1',
        value:'shopifycartid',
        
        path:'/',
    })
    cookies().set('hi','hi')
    cookies().set({
        name:'cookie',
        value:'value',
    })
    console.log(cartId)
    return 'hi'
    // if (!cartId || !variantId) {
    //     return new Error('Missing cartId or variantId')
    // }

    // try {
    //     await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }])
    // } catch (e) {
    //     return new Error('Error adding item', { cause: e })
    // }
}

// export const removeItem = async (lineId) => {
//     const cartId = cookies().get('cartId')?.value

//     if (!cartId) {
//         return new Error('Missing cartId')
//     }

//     try {
//         //notice that removefromcart([lineid]) and the lib/shopify/index.js removefromcart(lineids)
//         await removeFromCart(cartId, [lineId])
//     } catch (e) {
//         return new Error('Error removing item', { cause: e })
//     }
// }

// export const updateItemQuantity = async ({ lineId, variantId, quantity }) => {
//     const cartId = cookies().get('cartId')?.value

//     if (!cartId) {
//         return new Error('Missing CartId')
//     }

//     try {
//         await updateCart(cartId, [
//             {
//                 id: lineId,
//                 merchandiseId: variantId,
//                 quantity,
//             },
//         ])
//     } catch (e) {
//         return new Error('Error updating item quantify', { cause: e })
//     }
// }