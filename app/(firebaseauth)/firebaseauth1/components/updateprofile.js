'use client'
import { useAuthContext } from "../context/AuthContext"
import {useRef, useState} from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateEmailContext, updatePasswordContext} = useAuthContext()
    const [error, setError]=useState('')
    const [loading, setLoading]=useState(false)

    const router=useRouter()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        // try {
        //     setError('')
        //     setLoading(true)
        //     console.log('test')
        //     signup(emailRef.current.value, passwordConfirmRef.current.value)
        //     router.push('/firebaseauth1/dashboard')
        // } catch {
        //     setError('Failed to created an account')
        // }
        // setLoading(false)
        const promises=[]
        setError('')
        setLoading(true)

        if (emailRef.current.value!==currentUser.email) {
            promises.push(updateEmailContext(emailRef.current.value))
            // console.log('email')
        }
        if (passwordRef.current.value) {
            // console.log(passwordRef.current.value);
            promises.push(async ()=>await updatePasswordContext(passwordRef.current.value))
            // console.log(promises)
            // async ()=>await updatePasswordContext(passwordConfirmRef)
        }
        Promise.all(promises)
        .then(()=>{
            router.push('/firebaseauth1/dashboard')
        })
        .catch(()=>{
            setError('Failed to update account')
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update Profile
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && alert(error)}
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                  //emailref
                    ref={emailRef}
                    defaultValue={()=>Boolean(currentUser)?'':currentUser.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                  ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Comfirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                  ref={passwordConfirmRef}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                onClick={handleSubmit}
                disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update Profile
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button 
              onClick={()=>{router.push('firebaseauth1/login')}}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </>
    )
  }
  