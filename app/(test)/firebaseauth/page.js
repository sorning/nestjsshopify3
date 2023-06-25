'use client'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {auth} from '../../../lib/firebase'
export default function FirebaseAuth() {
    
    const signup=()=>createUserWithEmailAndPassword(auth, 'test@gmail.com','111111')
    const login=()=>signInWithEmailAndPassword(auth, 'test@gmail.com','11111')
    return (
        <>
            <p>hi</p>
            <button
            onClick={signup}
            >sign up</button>
            <button
            onClick={login}
            >login</button>
        </>
    )
}