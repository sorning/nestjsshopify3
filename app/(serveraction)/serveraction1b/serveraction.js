'use server'

export async function search(search=''){

     
    console.log('search for', search)

    const result=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)

    const data=await result.json()

    return data.results.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())).map((item)=>item.name.slice(0,50))
}