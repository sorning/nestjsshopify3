'use client'
import { useEffect, useRef, useState } from "react"
import emojiData1 from '../search3/data.json'

export default function Search() {
    //一般不用useref作为useeffect的dependency, 只能用searchRef,不能用searchref.current, 而searchref是不变的，searchref.current是变的。所以还是只能用usestate来操作input
    // const searchRef=useRef()
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        const newData = emojiData1.filter((item) => { return item.title.toLowerCase().includes(search.toLowerCase()) })
        setData(newData)
    }, [search])
    return (
        <>
            <h1>Emoji Search</h1>
            <input
            // ref={searchRef}
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            {
                data.map((item) => {
                    return (
                        <h1>
                            {item.title} {item.symbol}
                        </h1>
                    )
                })
            }
        </>
    )
}