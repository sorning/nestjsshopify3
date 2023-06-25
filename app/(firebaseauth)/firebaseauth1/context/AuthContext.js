'use client'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../../../../lib/firebase'
import { createContext, useContext, useEffect, useState } from "react"
const AuthContext=createContext()
export const AuthContextProvider=({children})=>{
    const [currentUser, setCurrentUser]=useState()
    const [loading, setLoading]=useState(true)

    function signup(email, password) {
        // return auth.createUserWithEmailAndPassword(email, password)
        return createUserWithEmailAndPassword(auth,email, password)
    }
    // const signup=(email, password)=>{return createUserWithEmailAndPassword(email,password)}

    // function login(email, password) {
    //     return auth.signInWithEmailAndPassword(email, password)
    // }
    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    // function logout() {
    //     return auth.signOut()
    // }
    const logout=()=>{
        return signOut(auth)
    }

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email)
    // }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    const updatePassword=(email)=>{
        return updatePassword(auth.currentUser,email)
    }

    // function updateEmail(email) {
    //     return currentUser.updateEmail(email)
    // }
    const updateEmail=(password)=>{
        return updatePassword(auth.currentUser, password)
    }
    // function updatePassword(password) {
    //     return currentUser.updatePassword(password)
    // }
    // useEffect(()=>{
    //     const unsubscribe=auth.onAuthStateChanged((user)=>{
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })
    //     return unsubscribe()
    // },[])
    const value={
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
// export const useAuthContext=()=>{return useContext(AuthContext)}
export function useAuthContext() {
    return useContext(AuthContext)
}