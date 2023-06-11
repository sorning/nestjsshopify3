'use client';
import { useState, useEffect } from "react";

export default function effectapp2() {
    const [count, setCount] = useState(4)
    const [resource, setResource] = useState('posts')
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${resource}`)
        .then(res=>res.json())
        .then(json=>setItems(json))
    },[count,resource])
    return (
        <>
            <button onClick={()=>setCount(preCount=>(preCount-1))}>---</button>
            <span>like{count}</span>
            <button onClick={()=>setCount(preCount=>(preCount+1))}>+++</button>
            <button onClick={()=>setResource('posts')}>posts</button>
            <button onClick={()=>setResource('users')}>users</button>
            <button onClick={()=>setResource('comments')}>comments</button>
            <p>{resource}</p>
            {items.map(item=>{
                return (
                    <p>{JSON.stringify(item)}</p>
                )
            })}
        </>
    )
}