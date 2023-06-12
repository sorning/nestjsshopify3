'use client';
import { useState, useEffect, useRef } from "react";

export default function inputuseref() {
    const [name, setName] = useState('');
    const renderCount = useRef(1)
    useEffect(()=>{
        renderCount.current = renderCount.current + 1
    })
    return (
        <>
            <input value={name} onChange={e=>(setName(e.target.value))} type='text' id='username' placeholder='username' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
            <div>My name is {name}</div>
            <div>I render {renderCount.current}times.</div>

      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </>

    );
};