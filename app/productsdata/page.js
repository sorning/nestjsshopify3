'use client'
import Link from "next/link"

export default function ProductsList() {
    return (
        <>
        <h1>Products List</h1>
        <ul>
            <li><Link href='/product/laundrybasket' >Laundry Basket</Link></li>
            <li><Link href='/product/pegboard' >Pegboard</Link></li>
            <li><Link href='/product/trashbags' >Trash Bags</Link></li>
            <li><Link href='https://baidu.com' >Trash Bags</Link></li>
        </ul>
        </>
    )
}