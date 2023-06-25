'use client'
import { createContext, useContext, useState } from "react"

export const ThemeContext=createContext()
export const ThemeContextProvider=({children})=>{
    const [color,setColor]=useState('red')
    return (
        <ThemeContext.Provider value={{color,setColor}}>
            <p>themecontex</p>
            {children}
            <p>themecontex</p>
        </ThemeContext.Provider>
    )
}
export const useThemeContext=()=>useContext(ThemeContext)