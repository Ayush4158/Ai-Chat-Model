'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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
      const response = await axios.post('/api/auth/register', {email, password})

      if(response.status === 201){
        router.push("/login")
      }

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.error || error.message)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=' h-screen w-screen flex items-center bg-black justify-center'>

      <div className='flex absolute h-full w-full justify-center items-center'>
      <div className='  h-[50%] w-[50%] bg-blue-700/90 blur-[250px] rounded-full animate-pulse'></div>
      <div className='h-[50%] w-[50%] bg-purple-700/90 blur-[250px] rounded-full animate-pulse duration-[3000] '></div>
      </div>

      <div className='relative border rounded-2xl bg-black/10'>

        <div className='flex flex-col justify-between items-center p-10'>
          <div className='text-[5vw] font-bold leading-[5vw]'>
            <h1>YOU'RE</h1>
            <h1>WELCOME</h1>
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
            <button onClick={handleSubmit} className='text-[2vw] text-black bg-white py-2 w-full rounded-md'>
              REGISTER
            </button>
          </div>

          <div className='w-full text-center flex mt-5 text-[1.8vw] font-semibold '>
            <p>You already have an account?</p>
            <Link href='/login' className='text-blue-300 underline'>login</Link>
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
