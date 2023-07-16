'use client'
import { useState } from "react"

export default function Test10() {
    const [isLoading, setIsLoading]=useState(false)
    return (
        <>
        <button
                  //add isloading ?? do not work
                  onClick={()=>setIsLoading(!isLoading)}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

                >
                  {isLoading && (
                    <svg class="animate-spin h-5 w-5 mr-3 text-white " viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) }
                  Add to bag
                </button>
        </>
    )
}