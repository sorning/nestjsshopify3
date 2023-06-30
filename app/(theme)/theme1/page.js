'use client'
import { useEffect, useState } from "react"

export default function Theme() {
    const [theme, setTheme]=useState(
        localStorage.getItem('theme')?localStorage.getItem('theme'):'system'
    )
    //step1
    useEffect(()=>{
        switch(theme) {
            case 'dark':
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme','dark')
                break;
            case 'light':
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme','light')
                break;
            default:
                localStorage.removeItem('theme')
                onWindowMatch()
                break;
        }
    },[theme])
    //step3
    window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (e)=>{
        if (!('theme'in localStorage)) {
            if (e.matches) {
                document.documentElement.classList.add('dark')
                //hou jia
                // localStorage.setItem('theme','dark')
            } else {
                document.documentElement.classList.remove('dark')
                //hou jia
                // localStorage.removeItem('theme')
            }
        }

        // if (('theme'in localStorage)&&e.matches) {localStorage.removeItem('theme')}
        // if (!('theme'in localStorage)&&e.matches) {return document.documentElement.classList.add('dark')}
        // if (!('theme'in localStorage)&&e.matches) {return document.documentElement.classList.remove('dark')}
        
    })
    //step2
    //onWindowMatch spaghetti from tailwind
    const onWindowMatch=()=>{
        if (localStorage.theme==='dark' || (!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches)){
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
    onWindowMatch()
    return (
        <>
            <div className="min-h-screen p-10 dark:text-gray-100 dark:bg-slate-900">
                <div className="fixed top-5 right-10 dark:bg-slate-700 bg-gray-100 rounded-lg p-2">
                    <button
                    onClick={()=>setTheme('dark')}
                     className={`${theme==='dark'&&'text-sky-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    </button>
                    <button
                    onClick={()=>setTheme('light')}
                    className={`${theme==='light'&&'text-sky-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    </button>
                    <button
                    onClick={()=>setTheme('system')}
                    className={`${theme==='system'&&'text-sky-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                    </button>
                </div>
                <h1>Sorning</h1>
                <p>Sorning Content</p>
            </div>

        </>
    )
}