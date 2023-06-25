'use client'
import { useAmp } from 'next/amp'
// import {ThemeContextProvider1} from './themecontext'
import {useThemeContext} from './context/themecontext'

export default function UsecontextApp1() {
    const {color,setColor}= useThemeContext()
    return (
        <>
            <p>{color}</p>
            <p>color</p>
        </>
    )
}