import { revalidatePath } from "next/cache"
import AddButton from "./AddButton"

const data=['learn ServerAction']
export default function ServerAction1() {
    async function addTodo(newTodo){
        'use server'

        await new Promise((resolve)=>setTimeout(resolve,3000))

        data.push(newTodo)
        revalidatePath('/serveraction1')
    }
    return (
        <main>
            <h1>Todos</h1>
            <ul>
                {data.map((item,index)=>(
                    <li key={index} >{item} </li>
                ))}
            </ul>
            <AddButton props={addTodo} />
        </main>
    )
}