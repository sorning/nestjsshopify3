'use client'
import { useState, useEffect, useRef,createContext, useContext,React } from "react"
import {db} from '../../../lib/firebase'
import { addDoc,collection,query,onSnapshot,doc,deleteDoc,updateDoc } from "firebase/firestore"
import PopupModal from "./popupModal"

export const EditPopupContext=createContext()
export default function firebasefirestore8() {
    const [items, setItems]=useState([
        {name:'coffe',price:'5'},
        {name:'tea', price:'5'}
    ])
    const [total, setTotal]=useState(0)
    //add item to database
    const [newItem, setNewItem]=useState({name:'',price:''})
    const addItem=async (e)=>{
        e.preventDefault();
        if (newItem.name!=''&&newItem.price!='') {
            await addDoc(collection(db,'items'),{
                name:newItem.name.trim(),
                price:newItem.price
            })
        }
        setNewItem({name:'',price:''})
    }
    //read data from database using query unsubscribe onsnapshot
    useEffect(()=>{
        const q=query(collection(db,'items'))
        const unsubscribe=onSnapshot(q,(querysnapshot)=>{
            const itemsArray=[]
            querysnapshot.forEach((doc)=>{
                itemsArray.push({...doc.data(), id:doc.id})
            })
            setItems(itemsArray)
            //calculate totalprice
            const totalprice=itemsArray.reduce((sum,item)=>sum+parseFloat(item.price),0)
            setTotal(()=>(totalprice))
            return ()=>unsubscribe();
        })
    },[])
    //delete item from database
    const deleteItem=async (id)=>{await deleteDoc(doc(db,'items',id))}
    //updataItem step 1 : transfer data to popup modal
    // use usestate from child component
    const [open, setOpen]=useState(false)
    const [updateItemId, setUpdateItemId]=useState('')
    return (
        <>
            <EditPopupContext.Provider value={{items,setItems,updateItemId,open, setOpen}}>
            <main className='flex justify-between min-h-screen flex-col sm:p-24 p-4'>
                <div className='z-10 w-full items-center justify-between max-w-5xl font-moto text-sm'>
                    <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
                    <div className='bg-slate-800 p-4 rounded-lg'>
                        <form className='grid grid-cols-6 items-center text-black'>
                            <input
                            value={newItem.name}
                            onChange={(e)=>setNewItem({...newItem,name:e.target.value})} 
                            className='col-span-3 p-4 border' type='text' placeholder='Enter Item'></input>
                            <input 
                            value={newItem.price}
                            onChange={(e)=>setNewItem({...newItem,price:e.target.value})}
                            className='col-span-2 p-4 border mx-3' type='text' placeholder='Enter $'></input>
                            <button
                            onClick={addItem}
                            className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'>+</button>
                        </form>
                        <ul>
                            {items.map((item)=>(
                                <li className="flex justify-between my-4 bg-slate-950">
                                    <div className="flex justify-between w-full p-4">
                                        <span className="capitalize">{item.name}</span>
                                        <span>${item.price}</span>
                                    </div>
                                    <button
                                    onClick={()=>{setUpdateItemId(item.id);setOpen(true);console.log(item.id);console.log('test')}}
                                    // onClick={()=>{setOpen(true);console.log('open')}}
                                    className="p-4 border-l-2 border-slate-900 w-16 hover:bg-slate-900"
                                    >Edit</button>
                                    <button 
                                    onClick={()=>(deleteItem(item.id))}
                                    className="p-4 border-l-2 border-slate-900 w-16 hover:bg-slate-900">X</button>
                                </li>
                            ))}
                        </ul>
                        {(items.length<0)?(''):(
                            <div className="flex justify-between p-3">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <PopupModal />
            </EditPopupContext.Provider>
        </>
    )
}