import PokemonList from "./pokemonList";
import { search } from "./serveraction";

export default function ServerAction4() {
    return (
        <>
            <main className="p-5">
                <PokemonList props={search} />
            </main>
        </>
    )
}