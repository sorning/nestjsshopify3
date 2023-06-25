'use client'
import { createContext, useReducer } from "react"
import Nav2 from "./nav"

export const ItemContext = createContext()
export default function App4() {
    const initialItemState = { count: 1, age: 3 }
    const itemReducer = (state, action) => {
        switch (action.type) {
            case 'increaseCount':  return { ...state, count: state.count + 1 } 
            case 'decreaseCount':  return { ...state, count: state.count - 1 } 
            case 'increaseAge':  return { ...state, age: state.age + 1 } 
        }
    }
    const [state, dispatch] = useReducer(itemReducer, initialItemState)
    
    return (
        <>
            <ItemContext.Provider value={{ state, dispatch }}>

                <div>
                    <button
                        onClick={() => dispatch({ type: 'increaseCount', payload: {} })}
                    >-</button>
                    <span>{state.count }</span>
                    <button
                        onClick={() => dispatch({ type: 'decreaseCount', payload: {} })}
                    >+</button>
                    
                </div>
                <Nav2 />
            </ItemContext.Provider>

        </>
    )
}