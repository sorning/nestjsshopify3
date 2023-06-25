'use client'
import { useReducer } from "react"
const initialItemState={count:1,age:21}
const itemReducer=(state,action)=>{
    switch (action.type) {
        case 'increase': 
            return {...state,count:state.count+1}
        
        case 'decrease': 
            return {...state,count:state.count-1}
        
        case 'increaseAge': 
            return {
                age:state.age+1,
                count:state.count
            }
        default:state
    }
}
export default function usereducerapp1() {
    const [state, dispatch]=useReducer(itemReducer,initialItemState)
    return (
        <>
            <div>
                <button
                onClick={()=>{dispatch({type:'increase',payload:{}})}}
                >-</button>
                <span>count {state.count}</span>
                <button
                onClick={()=>{dispatch({type:'decrease',payload:{}})}}
                >+</button>
                
                <button
                onClick={()=>{dispatch({type:'increaseAge',payload:{}})}}
                >increase age</button>
                <span>Age {state.age}</span>
            </div>
        </>
    )
}