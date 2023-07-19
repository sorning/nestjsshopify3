'use client'

import { useEffect, useRef, useState } from "react"

export default function PokemonList({props}) {
    const [pokemonNames, setPokemonNames]=useState()
    const [searchString, setSearchString]=useState()
    const inputRef=useRef()

    useEffect(()=>{
        props('').then((names)=>setPokemonNames(names))
    },[props])

    const handleClick=async()=>{
        setPokemonNames(await props(inputRef.current.value))
    }
    return (
        <>
        <div className="flex gap-2">
            <input 
            ref={inputRef}
            className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
            onClick={handleClick}
            className="bg-blue-600 disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >Search</button>
        </div>
        <div className="text-4xl py-5">Names: {pokemonNames} </div>
        </>
    )
}