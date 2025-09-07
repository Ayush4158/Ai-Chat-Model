'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa';


const page = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setEmail("")
    setPassword("")

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if(response?.error){
        console.log(response.error)
        setError(response.error)
      }else{
        router.push("/ai-tool")
      }

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.error || error.message)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=' h-screen w-screen flex items-center bg-black justify-center text-white'>

      <div className='flex absolute h-full w-full justify-center items-center'>
      <div className='  h-[50%] w-[50%] bg-blue-700/90 blur-[250px] rounded-full animate-pulse'></div>
      <div className='h-[50%] w-[50%] bg-purple-700/90 blur-[250px] rounded-full animate-pulse duration-[3000] '></div>
      </div>

      <div className='relative border rounded-2xl bg-black/10'>

        <div className='flex flex-col justify-between items-center p-10'>
          <div className='text-[5vw] font-bold leading-[5vw]'>
            <h1>WELCOME</h1>
            <h1>BACK</h1>
          </div>

          <div className='flex gap-x-2 py-5 w-full justify-center items-center '>
            <button onClick={() => signIn("google")} className='w-[45%] cursor-pointer border flex justify-center items-center py-2 rounded-md bg-white '>
              <FaGoogle className="text-black" size={25} />
            </button>
            <button onClick={() => signIn("github")} className='w-[45%] cursor-pointer border flex justify-center items-center py-2 rounded-md bg-white '>
              <FaGithub className="text-black" size={25} />
            </button>
          </div>

          <div className='flex flex-col justify-center items-center mt-5 gap-y-3 py-3'>
            <div className='text-[1.6vw] '>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email*' className='outline-none p-2 px-4 border rounded-full' required />
            </div>
            <div className='text-[1.6vw] '>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password*' className='outline-none p-2 px-4 border rounded-full' required/>
            </div>
          </div>

          <div className='w-full p-3 '>
            <button onClick={handleSubmit} className='text-[2vw] cursor-pointer text-black bg-white py-2 w-full rounded-md'>
              { loading ? 'Loading...' : 'LOGIN'}
            </button>
          </div>

          <div className='w-full text-center flex mt-5 text-[1.8vw] font-semibold '>
            <p>You dont have an account?</p>
            <Link href='/register' className='text-blue-300 underline'>register</Link>
          </div>


          { error && <div className='w-full text-center mt-5 text-sm text-red-600 '>
            <p>{error}</p>
          </div>}


        </div>

      </div>
    </div>
  )
}

export default page
