'use client'
import { useState, useEffect } from "react"
import {collection,addDoc, query, doc, onSnapshot, deleteDoc} from 'firebase/firestore'
import {db} from '../../lib/firebase'

export default function firebasefirestore5() {
    const [items, setItems]=useState([
        {name:'coffe',price:'4'},
        {name:'tea',price:'3'},
    ])
    const [total, setTotal]=useState(0)
    //add newitem to database
    const [newItem, setNewItem]=useState({name:'',price:''})
    const addItem=async (e)=>{
        e.preventDefault();
        if (newItem.name!='' && newItem.price !='')
        {await addDoc(collection(db,'items'),{
            name:newItem.name.trim(),
            price:newItem.price
        });
        setNewItem({name:'',price:''})}
    };
    //read items from database using unsubscribe onsnapshot query
    useEffect(()=>{
        
        const q=query(collection(db,'items'))
        const unsubscribe=onSnapshot(q,(querysnapshot)=>{
            const itemsArray=[]
            querysnapshot.forEach((doc)=>{
                itemsArray.push({...doc.data(),id:doc.id})
            });
            setItems(itemsArray);
            console.log('1')
            //calculate totalprice
            const calculateTotal=()=>{
                const totalprice=itemsArray.reduce((sum,item)=>sum+parseFloat(item.price),0)
            setTotal(totalprice);
            }
            calculateTotal();
            return ()=>unsubscribe();
        })
    },[])
    //delete item
    const deleteItem=async (id)=>{
        await deleteDoc(doc(db,'items', id));
    };
    return (
        <>
            <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
                <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
                    <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
                    <div className='bg-slate-800 p-4 rounded-lg'>
                        <form className='grid grid-cols-6 items-center text-black'>
                            <input 
                            value={newItem.name}
                            onChange={(e)=>(setNewItem({...newItem,name:e.target.value}))}
                            className='col-span-3 p-3 border' type='text' placeholder='Enter Item'></input>
                            <input 
                            value={newItem.price}
                            onChange={(e)=>(setNewItem({...newItem,price:e.target.value}))}
                            className='col-span-2 p-3 border mx-3' type='text' placeholder='Enter $'></input>
                            <button 
                            onClick={addItem}
                            className='bg-slate-950 hover:bg-slate-900 text-white p-3 text-xl' type='submit'>+</button>
                        </form>
                        <ul>
                        {items.map((item,id)=>(
                            <li key={id} className='flex justify-between w-full my-4 bg-slate-950'>
                                <div className='flex justify-between w-full p-4'>
                                    <span className='capitalize'>{item.name.trim()}</span>
                                    <span>${item.price}</span>
                                </div>
                                <button 
                                onClick={()=>{deleteItem(item.id)}}
                                className='ml-8 p-4 border-slate-900 hover:bg-slate-900 w-16'>X</button>
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