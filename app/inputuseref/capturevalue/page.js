'use client'
import { useState } from "react"

export default function capturevalue() {
    const [content, setContent] = useState('')
    return (
        <>
            <input onChange={e=>setContent(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <div>{content}</div>
        </>
    )
}