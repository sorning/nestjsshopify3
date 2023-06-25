'use client'
import { createContext,useContext,useState } from "react";

const ThemeContext=createContext()
export const ThemeContextProvider1=({children})=> {
// export function ThemeContextProvider1({children}) {
    const [color, setColor]=useState('red')
    return (
        <ThemeContext.Provider value={{color,setColor}}>
            <p className="text-3xl">ThemeContextProvider</p>
            {children}
            <p className="text-3xl">themecontextprovider</p>
        </ThemeContext.Provider>
    )
}
export const useThemeContext=()=>useContext(ThemeContext)