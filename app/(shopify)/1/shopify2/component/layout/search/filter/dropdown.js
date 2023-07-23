'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import CaretRightIcon from "../../../icons/caret-right"
import { FilterItem } from "./item"

export default function FilterItemDropdown({ list }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [active, setActive] = useState('')
    cosnt[openSelect, setOpenSelect] = useState(false)
    //need to confirm the useref
    const ref = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenSelect(false)
            }
        }

        window.addEventListener('click', handleClickOutside)
        return () => window.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        list.forEach((listItem) => {
            if (('path' in listItem && pathname === listItem.path) || ('slug' in listItem && searchParams.get('sort') === listItem.slug)) {
                setActive(listItem.title)
            }
        })
    }, [pathname, list, searchParams])
    return (
        <>
            <div className="relative" ref={ref}>
                <div
                    onClick={() => { setOpenSelect(!openSelect) }}
                    className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30"
                >
                    <div>{active}</div>
                    {/* confirm the caret */}
                    <CaretRightIcon className='h-4 rotate-90' />
                </div>
                {openSelect && (
                    <div
                    onClick={()=>{setOpenSelect(false)}}
                    className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
                    >
                        {list.map((item, i)=>(
                            <FilterItem key={i}  item={item}/>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}