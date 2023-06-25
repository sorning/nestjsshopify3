// 'use client'
import { ThemeContext } from "./page"
import { useContext } from "react"

export default function Nav() {
    const {count, setCount,state,dispatch}=useContext(ThemeContext)
    return (
        <>
            <div>
                <p>child</p>
                <button
                onClick={()=>dispatch({type:'increase'})}
                >+</button>
                <p>{state.count}</p>
            </div>
        </>
    )
}