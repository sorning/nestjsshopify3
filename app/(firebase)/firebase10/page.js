'use client'
import { useState, useEffect, createContext } from "react"
import { db } from '../../../lib/firebase'
import { collection, doc, query, onSnapshot, addDoc, deleteDoc } from 'firebase/firestore'
import PopupModal from "./popupModal"

export const EditPopupContext = createContext()
export default function firebasefirestore10() {
    const [items, setItems] = useState([
        { name: 'coffe', price: '1' },
        { name: 'tea', price: '9' },
    ])
    const [total, setTotal] = useState(0)
    //add data to database
    const [newItem, setNewItem] = useState({ name: '', price: '' })
    const addItem = async (e) => {
        e.preventDefault();
        if (newItem.name != '' && newItem.price != '') {
            await addDoc(collection(db, 'items'), {
                name: newItem.name.trim(),
                price: newItem.price
            })
        }
        setNewItem({ name: '', price: '' })
    }
    //read data from database using unsubscribe query onsnapshot useeffect
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querysnapshot) => {
        const itemsArray = []
        querysnapshot.forEach((doc) => {
            itemsArray.push({ ...doc.data(), id: doc.id })
        })
        setItems(itemsArray)
        //calculate total price
        const totalprice = () => (itemsArray.reduce((sum, item) => sum + parseFloat(item.price), 0))
        setTotal(totalprice)
        return () => unsubscribe()
    })
    //delete data from database 
    const deleteItem = async (id) => { await deleteDoc(doc(db, 'items', id)) }
    //updata data from database using createcontext usecontext popup modal
    const [open, setOpen] = useState(false)
    const [editUpdateItem, setEditUpdateItem]=useState({name:'jack',price:''})
    // const [editUpdateItemId,SetEditUpdateItemId]=useState('')
    return (
        <>
            <EditPopupContext.Provider value={{items, setItems, open,setOpen, editUpdateItem, setEditUpdateItem,}}>
                <main className="flex justify-between flex-col itemer-center sm:p-24 p-4">
                    <div className='z-10 items-center justify-between font-mono text-sm max-w-5xl'>
                        <h1 className="text-4xl text-center p-4">Expense Tracker</h1>
                    </div>
                    <div className="bg-slate-800 p-4 rounded">
                        <form className="grid grid-cols-6 items-center text-black">
                            <input
                                value={newItem.name}
                                onChange={(e) => (setNewItem({ ...newItem, name: e.target.value }))}
                                className="col-span-3 border p-3" type="text" placeholder="Enter Item"></input>
                            <input
                                value={newItem.price}
                                onChange={(e) => (setNewItem({ ...newItem, price: e.target.value }))}
                                className="col-span-2 border mx-3 p-3" type="text" placeholder="Enter $"></input>
                            <button
                                onClick={addItem}
                                className="bg-slate-950 p-3 text-white text-xl hover:bg-slate-900">+</button>
                        </form>
                        <ul>
                            {items.map((item) => (
                                <li className="flex justify-between w-full my-4 bg-slate-950">
                                    <div className="flex justify-between w-full p-4">
                                        <span className="capitalize">{item.name}</span>
                                        <span>${item.price.trim()}</span>
                                    </div>
                                    <button 
                                    onClick={()=>{
                                        // SetEditUpdateItemId(item.id);  
                                        setOpen(true);
                                        setEditUpdateItem({...editUpdateItem,name:item.name,price:item.price,id:item.id}) 
                                        console.log(item.id)             
                                    }}
                                    className="p-4 border-l-2 border-slate-900 w-16 hover:bg-slate-900">Edit</button>
                                    <button
                                        onClick={() => (deleteItem(item.id))}
                                        className="p-4 border-l-2 border-slate-900 w-16 hover:bg-slate-900">X</button>
                                </li>
                            ))}
                        </ul>
                        {(items.length < 0) ? ('') : (
                            <div className="flex justify-between p-3">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        )}
                    </div>
                </main>
                <PopupModal />
            </EditPopupContext.Provider>
        </>
    )
}