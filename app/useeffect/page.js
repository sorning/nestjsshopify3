'use client';
import { useState, useEffect } from "react";

export default function Effect1() {
    const [count, setCount]=useState(4)
    function increaseCount() {
        setCount(preCout=>preCout+1)
    };
    function decreseCount() {
        setCount(preCout=>preCout-1)
    }
    
    const [resource, setResource] = useState('posts')
    useEffect(()=>console.log('changed'),[count,resource])
    return (
        <>
            <button onClick={decreseCount}>---</button>
            <span>Like {count}</span>
            <button onClick={increaseCount}>---</button>

            <div>
                <button onClick={()=>setResource('posts')}>posts </button>
                <button onClick={()=>setResource('users')}>users</button>
                <button onClick={()=>setResource('comments')}>comments</button>
                <p>{resource}</p>
            </div>
        </>
    )
}