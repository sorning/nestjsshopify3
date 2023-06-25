'use client'
import { ChangeColor } from "./changecolorapp"
import { useThemeContext } from "./context"
export default function usecontext2() {
    const { color, setColor } = useThemeContext()
    return (
        <>
            <ChangeColor />
            <p>color</p>
            <p>{color}</p>
        </>
        
    )
}