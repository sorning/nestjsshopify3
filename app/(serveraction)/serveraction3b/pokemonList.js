'use client'

import { useEffect, useRef, useState } from "react"

export default function PokemonList({props}) {
    const inputRef=useRef()
    const [pokemonNames, setPokemonNames]=useState()

    useEffect(()=>{
        props('').then((names)=>setPokemonNames(names))
    },[props])

    const handleClick=async()=>setPokemonNames(await props(inputRef.current.value))

    return (
        <>
            <div className="flex gap-2">
                <input 
                ref={inputRef}
                type="text"
                name="search"
                className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button
                onClick={handleClick}
                >Search</button>
            </div>
            <div className="text-4xl py-5">
                Names: {pokemonNames}
            </div>
        </>
    )
}