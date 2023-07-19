import { revalidatePath } from "next/cache"
import AddButton from "./AddButton"

const data=['learn server action']

export default function ServerAction3() {
    async function addTodo(newTodo){
        'use server'

        await new Promise((resolve)=>setTimeout(resolve, 3000))

        data.push(newTodo)

        revalidatePath('/serveraction3a')
    }
    return (
        <>
            <main>
                <h1>Todos</h1>
                <ul>
                    {data.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </main>
            <AddButton props={addTodo} />
        </>
    )
}