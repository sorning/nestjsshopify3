'use client'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { SearchContext } from './page'
import { collection, onSnapshot, query, and, or, where } from 'firebase/firestore'
import { db } from '../../../lib/firebase2'


export default function SearchPopupModal() {
  const { open, setOpen } = useContext(SearchContext)
  const cancelButtonRef = useRef(null)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'emojis'), and(where('title', '==', search), or(where('symbol', '==', 'symbol'), where('keywords', '==', 'keywords'))))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArray = []
      querySnapshot.forEach((doc) => {
        itemsArray.push({ ...doc.data(), id: doc.id })
      })
      console.log('hi')
      setData(itemsArray)

      const newData = itemsArray.filter((item) => (item.title.toLowerCase().includes(search.toLowerCase())))
      setDataFilter(newData)
      return unsubscribe()
    })
  }, [search])
  // useEffect(() => {
  //   const newData = data.filter((item) => (item.title.toLowerCase().includes(search.toLowerCase())))
  //   setDataFilter(newData)
  // }, [search])

  //test urlsearchparams
  const params=new URLSearchParams('?name=John&age=30')
  console.log(params.get('name'))

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        {/* drop the bg-gray-500, add the backdrop-blur-sm */}
          <div className="fixed inset-0  bg-opacity-75 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white py-2 pb-2 pt-2 sm:py-6 sm:pb-4 ">
                  <div className="sm:flex sm:items-start">
                   
                    <div className=" text-start sm:ml-4 sm:mt-0 sm:text-left ">
                          <form className='flex justify-between w-full item-center '>
                          <input 
                          className=' text-gray-600 p-2 w-full focus:outline-none'
                          type='text'
                          placeholder='Seach Infromation...'
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                          />
                          <section className='text-black p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                            </svg>
                            </section>
                          </form>
                          
                          {
                            dataFilter.map((item) => (
                              <div className='flex justify-between border-t border-gray-500 p-2 hover:bg-purple-200 '>
                                <sapn>
                              <h2 className='text-gray-800 hover:text-sky-800 capitalize font-medium'>
                                {item.title} {item.symbol}
                              </h2>
                              </sapn>
                              <span>
                              <h3 className='text-gray-500 capitalize'>
                                {item.title} 
                              </h3>
                              </span>
                              </div>
                            ))
                          }
                      
                    </div>
                  </div>
                </div>
                {/* <div>
                  <input
                    className='text-black'
                    type='text'
                    placeholder='Search Information...'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  ></input>
                </div>
                <div>
                  <h1
                    className='text-black '
                  >From Firebase Query</h1>
                  {
                    data.map((item) => {
                      return (
                        <h2
                          className='text-black'
                        >
                          {item.title} {item.symbol}
                        </h2>
                      )
                    })
                  }
                </div>
                <div className=''>
                  <h1
                    className='text-black'
                  >Filtered from Firebase Query</h1>
                  {
                    dataFilter.map((item) => (
                      <h2 className='text-black'>
                        {item.title} {item.symbol}
                      </h2>
                    ))
                  }
                </div> */}
                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}