'use client'
import { useContext } from "react"
import { useThemeContext } from "./context/theme"
import { ThemeContext } from "./context/theme"
import Link from "next/link"
export default function Test6(){
  // const [color, setColor]=useContext(ThemeContext)
  const {color, setColor}=useThemeContext()
  return (
    <>
      <h1>Main page</h1>
      <p>current color:{color} </p>
      <button>set color to blue</button>
      <p>go to sencond page</p>
    </>
  )
}