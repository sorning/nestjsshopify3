import PokemonList from "./pokemonList";
import { search } from "./serveraction";

export default function PokemonSearch() {
    return (
        <>
            <main className="p-5">
                <PokemonList props={search} />
            </main>
        </>
    )
}