'use client'
import { useEffect, useState } from "react"
import emojiData from './data.json'

export default function Search() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        const newData = emojiData.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase())
        })
        setData(newData)
    }, [search])
    return (
        <>
            <h1>Emoji Search</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            {
                data.map((item) => (
                    <h2>
                        {item.title} {item.symbol}
                    </h2>
                ))
            }
        </>
    )
}