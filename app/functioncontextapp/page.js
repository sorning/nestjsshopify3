'use client';
import React, {useState} from 'react';
import FunctionContextComponent from '@/app/functioncontextapp/FunctionContextComponent/functioncontextcomponent';

const test=1
export const ThemeContext = React.createContext()
export default function contextApp() {
    console.log(test)
    const [darkTheme, setDarkTheme] = useState(true)
    function toggleTheme() {
        setDarkTheme(preDarkTheme => !preDarkTheme)
    }
    return (
        <>
            <ThemeContext.Provider value={[test,darkTheme]}>
                <button onClick={toggleTheme} >toggle theme</button>
                <FunctionContextComponent />
            </ThemeContext.Provider>
        </>
    )
}