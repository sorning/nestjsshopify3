'use client'
import { useReducer } from "react"
const initialCount={count:1,age:21}
const itemReducer=(state,action)=>{
    switch (action.type) {
        case 'increase': 
            return {...state,count:state.count+1}
        
        case 'decrease': 
            return {
                count:state.count-1,
                age:state.age
            }
        
        case 'increaseAge': 
            return {
                age:state.age+1,
                count:state.count
            }
        default:state
    }
}
export default function usereducerapp1() {
    const [state, dispatch]=useReducer(itemReducer,initialCount)
    return (
        <>
            <div>
                <button
                onClick={()=>{dispatch({type:'increase'})}}
                >-</button>
                <span>count {state.count}</span>
                <button
                onClick={()=>{dispatch({type:'decrease'})}}
                >+</button>
                
                <button
                onClick={()=>{dispatch({type:'increaseAge'})}}
                >increase age</button>
                <span>Age {state.age}</span>
            </div>
        </>
    )
}