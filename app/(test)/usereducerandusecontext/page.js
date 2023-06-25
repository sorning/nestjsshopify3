'use client'
import { createContext, useReducer , useState, React} from "react"
import Nav from './nav'

export const ThemeContext = createContext()

const initialCount={count:1,age:21}
const countReducer=(state, action)=>{
    switch (action.type) {
        case 'increase': return {...state, count:state.count+1}
             
    }
}

export default function usereducerapp2() {
    const [state, dispatch]=useReducer(countReducer,initialCount)
    const [count, setCount]=useState(0)
    return (
        <>
            <ThemeContext.Provider value={{count,setCount,state,dispatch}}>
                <div>
                    <span>hirue</span>
                    <span>{state.count}</span>
                    <button
                    onClick={()=>dispatch({type:'increase'})}
                    >+</button>
                </div>
                <Nav />
            </ThemeContext.Provider>

        </>
    )
}