import { useThemeContext } from "./context"
export const ChangeColor=()=>{
    const {color, setColor}=useThemeContext()
    return (
        <>
            <button
            onClick={setColor('blue')}
            >change color</button>
        </>
    )
}