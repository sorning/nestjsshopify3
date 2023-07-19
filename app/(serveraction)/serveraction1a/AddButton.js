'use client'

import { useRef, useTransition } from "react"

export default function AddButton({ props }) {
    const [isPending, startTransition]=useTransition()
    const todoRef = useRef()
    return (
        <div>
            <input
                ref={todoRef}
                type='text'
                name="todo"
                className="border border-gray-300 rounded-lg py-4 px-4 text-base font-normal text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
            disabled={isPending}
            onClick={async()=>{
                startTransition(async()=>
                await props(todoRef.current.value))
            }}
            >
            Add Todo
            </button>
        </div>
    )
}