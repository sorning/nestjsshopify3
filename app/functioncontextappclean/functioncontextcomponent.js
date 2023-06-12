import React from 'react'
import { useTheme, useThemeUpdate } from './themecontextprovider';
import { useContext } from "react";
import { ThemeContext, ThemeUpdateContext } from "../functioncontextapp/page";

// const darkTheme = useContext(ThemeContext)
// const darkThemeUpdate = useContext(ThemeUpdateContext)

export default function FunctionContextComponent() {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#ccc',
        color: darkTheme ? '#ccc' : '#333',
        padding: '2rem',
        margin: '2rem',
    }
    return (
        <>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <div style={themeStyles}>Function Theme</div>
        </>
    )
}