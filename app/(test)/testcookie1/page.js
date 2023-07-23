'use client'

import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export default function Mycookie() {
    const [cookies, setCookie] = useCookies(['cartId'])
    const [cookievalue,setCookievalue]=useState()

    useEffect(() => {

        const mycookievalue = cookies.cartId
        setCookievalue(mycookievalue)
        setCookie('cartId','test2',{
            path:'/',
        })
        
    }, [])
    // const mycookievalue=cookies.cartId

    // const handleSetCookie=()=>{
    //     setCookie('cartId','cartIdValue',{path:'/'})
    // }
    return (
        <>
            <p>My cookie</p>
            <p>my cookie: {cookievalue}</p>
            {/* <button onClick={handleSetCookie}>Set new cookie</button> */}
        </>
    )
}