'use client'
import { useState, useReducer } from "react"
const initialState={count:0,age:21}
const countReducer=(state,action)=>{
    switch (action.type) {
        case 'increase':
            return {
                count:state.count+1,
                age:state.age+1
            }
        default:state
    }
}


export default function test() {
    const [state,dispatch]=useReducer(countReducer,initialState)

    // const [count, setCount]=useState(0)
    // const increase=()=>setCount(precount=>precount+1)
    // function decrease() {
    // setCount(pre=>pre-1)
    // }
    return (
        <>
            <button
            // onClick={increase}
            >-</button>
            <span>count:{state.count}</span>
            <span>age:{state.age}</span>
            <button
            // onClick={decrease}
            onClick={()=>{
                dispatch({type:'increase'})
            }}
            >+</button>
        </>
    )
}