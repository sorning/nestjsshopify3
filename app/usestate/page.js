'use client';
import { useState } from "react";

export default function LikeHeart() {
    const [count, setCount] = useState(4)
    function Likebutton() {
        setCount(count-1)
    }
    function Dislikebutton() {
        setCount(preCount => preCount + 1)
    }
    return (
        <>
            <button onClick={Likebutton}>-</button>
            <spn>{count} like</spn>
            <button onClick={Dislikebutton}>+</button>
        </>
    )
}