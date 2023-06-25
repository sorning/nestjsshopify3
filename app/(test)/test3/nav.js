'use client'
import { ItemContext } from './page'
import { useContext } from 'react'



export default function Nav() {
    const {state, dispatch}=useContext(ItemContext)
    return (
        <>
            <div>
                <span>
                    {state.age}
                </span>
                <button
                    onClick={() => dispatch({ type: 'increaseAge', payload: {} })}
                >IncreaseAge</button>
            </div>
        </>
    )

}