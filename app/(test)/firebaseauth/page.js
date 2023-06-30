'use client'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth"
import {auth} from '../../../lib/firebase'
export default function FirebaseAuth() {
    
    const signup=()=>createUserWithEmailAndPassword(auth, 'test@gmail.com','111111')
    const login=()=>signInWithEmailAndPassword(auth, 'test@gmail.com','11111')
    const update=()=>updatePassword(auth.currentUser,'123123')
    console.log(auth.currentUser)
    return (
        <>
            <p>hi</p>
            <button
            onClick={signup}
            >sign up</button>
            <button
            onClick={login}
            >login</button>
            <button
            onClick={update}
            >updatePassword</button>
        </>
    )
}