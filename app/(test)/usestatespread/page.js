'use client'
import { useState } from "react";


export default function test() {
    const [updateNewItem, setUpdateNewItem]=useState({name:'rose',price:''})
    // setUpdateNewItem({...updateNewItem,name:'hi'});
    // console.log(updateNewItem)
    
    return (
        <>
            <p>{updateNewItem.name}</p>
            <p>hi</p>
            {/* <button
            onClick={()=>{setUpdateNewItem(pre=>({...pre,name:'jack'}))}}
            >hihihihi</button> */}
            <button
            onClick={()=>{setUpdateNewItem(pre=>({...pre,name:'jack'}));console.log(updateNewItem.name)}}
            >testtest</button>
        </>
    )
}