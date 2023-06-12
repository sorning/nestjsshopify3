'use client'
import React from 'react'
import FunctionContextComponent from "./functioncontextcomponent";
import {ThemeProvider} from './themecontextprovider'

export default function App2() {
    return (
        <>
            <ThemeProvider>
                <FunctionContextComponent />
            </ThemeProvider>
            
        </>
        
    )
}


//could not run, the possible reason is nextjs rout don't support this kind for usage.
//try to use <ThemeContext.Provider value={[]}> ...   directly.