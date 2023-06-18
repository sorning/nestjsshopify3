'use client'
import { Fragment, useRef, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {EditPopupContext} from './page'
import {db} from '../../../lib/firebase'
import {doc, updateDoc} from 'firebase/firestore'

export default function PopupModal() {
    //use transfer data from parent
    const {items, setItems,updateItemId,open,setOpen,}=useContext(EditPopupContext)
    // const [open, setOpen] = useState(true)
    // we create the [open, steopen]=usestate() in the parent, and usecontext to import them from parent to here.
    
    const cancelButtonRef = useRef(null)

    //updata item step 2 : create updateitem using usestate , and create function updatenewitem,then update data to firebase database
    const [updateNewItem, setUpdateNewItem]=useState({name:'',price:''})
    const updateItem=async (id)=>{
        if (updateNewItem.name!='' && updateNewItem.price!='') {
            await updateDoc(doc(db,'items',id),{
                name:updateNewItem.name,
                price:updateNewItem.price
            })
            console.log('updateitem')
        }
    }
    
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Update Content
                                            </Dialog.Title>
                                            <div className="mt-2 ">
                                                <p className="text-sm text-gray-500">
                                                    Please input explicit data, so that we could analyze the data precisely. Our workflow will benefit from them. 
                                                </p>
                                                <div className='grid grid-cols-3 w-full'>
                                                    <input 
                                                    onChange={(e)=>setUpdateNewItem({...updateNewItem, name:e.target.value})}
                                                    value={updateNewItem.name}
                                                    placeholder='Enter Data' className='text-black border border-slate-950 p-1 my-2 rounded col-span-2'></input>
                                                    <input 
                                                    onChange={(e)=>setUpdateNewItem({...updateNewItem, price:e.target.value})}
                                                    value={updateNewItem.price}
                                                    placeholder='Enter $' className='text-black border border-slate-950 p-1 my-2 ml-3 rounded'></input>
                                                </div>
                                                
                                                <p>
                                                    {items.map((item)=>(
                                                        <div className='text-black'>
                                                          <p>{item.name}</p> 
                                                            </div>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={(item) => {setOpen(false);updateItem(updateItemId);}}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
