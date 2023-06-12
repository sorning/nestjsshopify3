'use client'
import React, {useState} from 'react'
import { useContext } from 'react'


const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export default function ThemeProvider({Children}) {
    const [darkTheme, setDarkTheme] = useState(true)
    function toggleTheme() {
        setDarkTheme(preDarkTheme=>!preDarkTheme)
    }
    return (
        <>
            <ThemeContext.provider value={darkTheme}>
                <ThemeUpdateContext value={toggleTheme}>
                    {Children}
                </ThemeUpdateContext>
            </ThemeContext.provider>
        </>
    )
}

//<ThemeUpdateContext value={toggleTheme}>   context could transfer function
//the provider's function is to create the context, create the provider, create the value(int, boolean, function) 