'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setEmail("")
    setPassword("")

    try {
      const response = await axios.post('/api/auth/register', { email, password })
      if (response.status === 201) {
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
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="h-[60%] w-[60%] md:h-[50%] md:w-[50%] bg-blue-700/90 blur-[150px] rounded-full animate-pulse"></div>
        <div className="h-[60%] w-[60%] md:h-[50%] md:w-[50%] bg-purple-700/90 blur-[150px] rounded-full animate-pulse duration-[3000] absolute"></div>
      </div>

      {/* Main Card */}
      <div className="relative border rounded-2xl bg-black/40 backdrop-blur-md w-[90%] max-w-md p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="text-center font-bold leading-tight">
            <h1 className="text-[clamp(2rem,6vw,3.5rem)]">YOU'RE</h1>
            <h1 className="text-[clamp(2rem,6vw,3.5rem)]">WELCOME</h1>
          </div>

          {/* Inputs */}
          <div className="flex flex-col w-full mt-5 gap-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              className="outline-none p-3 border rounded-full bg-transparent w-full text-base md:text-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              className="outline-none p-3 border rounded-full bg-transparent w-full text-base md:text-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="text-[clamp(1rem,4vw,1.5rem)] cursor-pointer text-black bg-white py-3 w-full rounded-md mt-6 transition hover:bg-gray-200"
          >
            {loading ? "Loading..." : "REGISTER"}
          </button>

          {/* Login Link */}
          <div className="w-full text-center mt-5 text-[clamp(0.9rem,3vw,1.2rem)] font-semibold flex flex-wrap justify-center gap-1">
            <p>Already have an account?</p>
            <Link href="/login" className="text-blue-300 underline">
              Login
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full text-center mt-5 text-sm text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
