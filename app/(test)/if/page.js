'use client'
import { useState } from "react"
export default function IfApp() {
    const [color, setColor]=useState('green')
    // if (color!=='green') {
    //     // console.log('green')
    //     return console.log('prevent')
    // } 
    // console.log('not prevented')

    const preventIf=()=>{
        if (color=='green') {
            // console.log('green')
            return console.log('prevent')
        } 
        console.log('not prevented')
    }
    preventIf()
    
    return (
        <>
        <p>hi{color}</p>
        </>
    )
}