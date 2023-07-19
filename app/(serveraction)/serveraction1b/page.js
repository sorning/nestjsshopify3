import PokemonList from "./PokemonList"

import { search } from "./serveraction"

export default function PokemonSearch() {
    // async function search(search=''){
    //     'use server'
         
    //     console.log('search for', search)

    //     const result=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)

    //     const data=await result.json()

    //     return data.results.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())).map((item)=>item.name.slice(0,50))
    // }
    return (
        <main className="p-5">
            <PokemonList props={search} />
        </main>
    )
}