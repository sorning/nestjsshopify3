'use client';
import React, {useContext} from 'react';
import { ThemeContext } from '@/app/functioncontextapp/page';


export default function FunctionContextComponent() {
    const test1=useContext(ThemeContext)
    console.log(test1[0])
    const darkTheme = useContext(ThemeContext)[1]
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#ccc',
        color: darkTheme ? '#ccc' : '#333',
        padding: '2rem',
        margin: '2rem',
    }
    return (
        <div style={themeStyles}>function theme</div>
    )
}