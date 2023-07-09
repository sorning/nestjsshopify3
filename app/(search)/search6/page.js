'use client'
import { useEffect, useState } from "react"
import emojiData from '../search3/data.json'
import { db } from '../../../lib/firebase2'
// import { addItem } from "./firestore"
import { addDoc, collection, onSnapshot, query, where,and,or } from "firebase/firestore"

export default function Search() {
    const [search, setSearch] = useState('title')
    const [data, setData] = useState([])
    // useEffect(() => {
    //     const newData = emojiData.filter((item) => { return item.title.toLowerCase().includes(search.toLowerCase()) })
    //     setData(newData)
    // }, [search])

    // const firestoreItem = {
    //     title: 'title1',
    //     symbol: 'symbol1',
    //     keywords: 'keywords1',
    // }
    const handleAddItem = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'emojis'), {
            // title:'title',
            // symbol:'symbol',
            // keywords:'keywords',
            firestoreItem
        });
        // emojiData.map(async (item)=>{
        //     const newItem={title:item.title,symbol:item.symbol,keywords:item.keywords}
        //     await addDoc(collection(db,'emojis'),{newItem})
        // })
    }
    const title='title'
    useEffect(() => {
        const q = query(collection(db, 'emojis'),and(where('title','==',search),or(where('symbol','==','symbol'),where('keywords','==','keywords'))))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsArray = []
            querySnapshot.forEach((doc) => {
                itemsArray.push({ ...doc.data(), id: doc.id })
            })
            setData(itemsArray)
            return unsubscribe()
        })
    }, [search])
    return (
        <>
            <h1>Emoji Search</h1>
            <input
            className="text-black"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <div>
                <button
                    onClick={handleAddItem}
                >Send Emoji</button>
            </div>
            {
                data.map((item) => {
                    return (
                        <h2>
                            {item.title} {item.symbol}
                        </h2>
                    )
                })
            }

        </>
    )
}