'use client';
import { useState, useEffect } from "react";
import { addDoc, query, collection, onSnapshot, deleteDoc,doc } from "firebase/firestore";
import {db} from '../../lib/firebase';

export default function firebasefiresoteapp4() {
    const [items, setItems]=useState([
        {name:'tea', price:'7'},
        {name:'coffe',price: '9'},
    ])
    const [total, setTotal]=useState(0)
    //add newitem to database
    const [newItem, setNewItem]=useState({name:'',price:''})
    const addItem= async (e)=>{
        e.preventDefault();
        await addDoc(collection(db,'items'),{
            name:newItem.name,
            price:newItem.price,
        });
        setNewItem({name:'',price:''})
    }
    //read items from database using unsubscribe onsnapshot listener
    useEffect(()=>{
        const q=query(collection(db,'items'));
        const unsubscribe=onSnapshot(q,(querySnapshot)=>{
            const itemsArray=[]
            querySnapshot.forEach((doc)=>{
                itemsArray.push({...doc.data(),id:doc.id})
            })
            setItems(itemsArray);
            //calculate totalprice
            const calculateTotal=()=>{
                const totalprice=itemsArray.reduce((sum,item)=>sum+parseFloat(item.price),0);
                setTotal(totalprice);
            };
            calculateTotal();
            return ()=>unsubscribe();
        })
    },[]);
    //delete item
    const deleteItem=async (id)=>{
        await deleteDoc(doc(collection(db,'items'),id))
    };
    return (
        <>
            <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 '>
                <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
                    <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
                    <div className='bg-slate-800 p-4 rounded-lg'>
                        <form className='grid grid-cols-6 items-center text-black'>
                            <input 
                            value={newItem.name}
                            onChange={(e)=>setNewItem({...newItem,name:e.target.value})}
                            className='col-span-3 p-3 border'
                            type='text' placeholder='Enter Item'></input>
                            <input 
                            value={newItem.price}
                            onChange={(e)=>setNewItem({...newItem,price:e.target.value})}
                            className='col-span-2 p-3 border mx-3 '
                            type='text' placeholder='Enter $'></input>
                            <button onClick={addItem} className='bg-slate-950 text-white hover:bg-slate-900 p-3 text-xl'>+</button>
                        </form>
                        <ul>
                            {items.map((item, id)=>(
                                <li key={id} className='my-4 w-full flex justify-between bg-slate-950'>
                                    <div className='p-4 w-full flex justify-between'>
                                        <span>{item.name.trim()}</span>
                                        <span>{item.price}</span>
                                    </div>
                                    <button onClick={()=>{deleteItem(item.id)}} className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'>X</button>
                                </li>
                            ))}
                        </ul>
                        {items.length<0 ? (''):(
                            <div className='flex justify-between p-3' >
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