'use client'
import { addDoc, query, onSnapshot, doc, collection, deleteDoc } from "firebase/firestore"
import {db} from '../../lib/firebase'
import { useState, useEffect } from "react"


export default function firebasefirestoreapp7() {
    const [items,setItems]=useState([
        {name:'tea',price:'8'},
        {name:'coffe',price:'9'}
    ])
    const [total, setTotal]=useState(0)
    //add newitem to database
    const [newItem, setNewItem]=useState({name:'',price:''})
    const addItem= async (e)=>{
        e.preventDefault();
        if (newItem.name!='' && newItem.price!='') {
            await addDoc(collection(db,'items'),{
                name:newItem.name.trim(),
                price:newItem.price
            })
            setNewItem({name:'',price:''})
        }
    }
    //read items from database using query unsubscribe onsnapshot
    useEffect(()=>{
        const q=query(collection(db,'items'))
        const unsubscribe=onSnapshot(q,(querysnapshot)=>{
            const itemsArray = []
            querysnapshot.forEach((doc)=>{
                itemsArray.push({...doc.data(),id:doc.id})
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
    return (
        <>
            <main className='flex justify-between min-h-screen flex-col sm:p-24 p-4'>
                <div className='items-center justify-between z-10 w-full max-w-5xl font-mono text-sm'>
                    <h1 className='text-center text-4xl p-4'>Expense Tracker</h1>
                    <div className='bg-slate-800 p-4 rounded-lg'>
                        <from className='grid grid-cols-6 items-center text-black'>
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
                            className='bg-slate-950 p-4 text-white text-xl hover:bg-slate-900'>+</button>
                        </from>
                        <ul>
                            {items.map((item)=>(
                                <li className='flex justify-between w-full my-4 bg-slate-950'>
                                    <div className='flex justify-between w-full p-4'>
                                        <span className='capitalize'>{item.name}</span>
                                        <span>${item.price.trim()}</span>
                                    </div>
                                    <button 
                                    onClick={()=>{deleteItem(item.id)}}
                                    className='ml-4 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 '>X</button>
                                </li>
                            ))}
                        </ul>
                        {(items.length<0)?(''):(
                            <div className='flex justify-between p-3'>
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}