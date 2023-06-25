'use client'
import { useReducer, useState, useEffect } from "react"

const initialItemsState=()=>{
    const initialItems=[{name:'coffe',price:2},{name:'tea',price:1}];
    
    return {
        draftName:'',
        draftPrice:'',
        items:initialItems
    }
} 
const itemsReducer = (state, action) => {
    const newItem=[]
    switch (action.type) {
        case 'ChangeDraftName': return {...state,
            draftName:action.payload,
        }
        case 'ChangeDraftPrice': return {...state,
            draftPrice:action.payload,
        }
        // case 'ChanngeDraft': return {
        //     draftPrice:action.action
        // }
        case 'AddItem': 
            // console.log(state.items[1].name)
            
            return {
                ...state,
                items:[...state.items,action.payload]
            }
        // default:state.items
        
    }
}
export default function App4() {

    const [state, dispatch] = useReducer(itemsReducer, initialItemsState())
    // const [items, setItems]=useState([
    //     {name:'tea',price:1},
    //     {name:'coffe',price:4}
    // ])
    return (
        <>
            <main className="flex justify-between min-h-screen flex-col sm:p-24 p-4">
                <div className="z-10 w-full items-center justify-between max-w-5xl font-mono text-sm">
                    <h1 className="text-4xl p-4  text-center">Expense Tracker</h1>
                    <div className="bg-slate-800 p-4 rounded">
                        <form className="grid grid-cols-6 items-center text-black">
                            <input 
                            onChange={(e)=>{
                                dispatch({type:'ChangeDraftName',payload:e.target.value});
                                console.log(state.items[0])
                            }}
                            className="col-span-3 p-3 border" placeholder="Enter Item"></input>
                            <input 
                            onChange={(e)=>dispatch({type:'ChangeDraftPrice',payload:e.target.value})}
                            className="col-span-2 p-3 border mx-3" placeholder="Enter $"></input>
                            <button
                            onClick={(e)=>{
                                e.preventDefault();
                                const {input1, input2} =state;
                                const newItem={name:input1, price:input2}
                                dispatch({type:'AddItem',payload:newItem})
                            }}
                            className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl">+</button>
                        </form>
                        <ul>
                            {state.items.map((item) => (
                                <li className="flex justify-between my-4 bg-slate-950">
                                    <div className="flex justify-between w-full p-4">
                                        <span className="capitalize">{item.name}</span>
                                        <span>${item.price}</span>
                                    </div>
                                    <button className="border-l-2 border-slate-900 hover:bg-slate-900 w-16">Edit</button>
                                    <button className="border-l-2 border-slate-900 hover:bg-slate-900 w-16">X</button>
                                </li>
                            ))}
                            {/* {items.map((item)=>(
                                <li>
                                    <div>
                                        <span>{item.name}</span>
                                        <span>{item.price}</span>
                                    </div>
                                    <button>Edit</button>
                                    <button>X</button>
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}