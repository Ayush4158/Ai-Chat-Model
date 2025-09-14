'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

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

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (response?.error) {
        setError(response.error)
      } else {
        router.push("/ai-tool")
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white p-4">
      {/* Background blur blobs */}
      <div className="flex absolute h-full w-full justify-center items-center overflow-hidden">
        <div className="h-[40%] w-[40%] bg-blue-700/90 blur-[200px] rounded-full animate-pulse"></div>
        <div className="h-[40%] w-[40%] bg-purple-700/90 blur-[200px] rounded-full animate-pulse duration-[3000]"></div>
      </div>

      {/* Card */}
      <div className="relative border rounded-2xl bg-black/40 w-full max-w-md">
        <div className="flex flex-col justify-between items-center p-8 sm:p-10">
          {/* Heading */}
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center">
            <h1>WELCOME</h1>
            <h1>BACK</h1>
          </div>

          {/* Social login buttons */}
          <div className="flex gap-x-3 py-5 w-full justify-center items-center">
            <button
              onClick={() => signIn("google")}
              className="w-1/2 cursor-pointer border flex justify-center items-center py-2 rounded-md bg-white hover:bg-gray-200 transition"
            >
              <FaGoogle className="text-black" size={22} />
            </button>
            <button
              onClick={() => signIn("github")}
              className="w-1/2 cursor-pointer border flex justify-center items-center py-2 rounded-md bg-white hover:bg-gray-200 transition"
            >
              <FaGithub className="text-black" size={22} />
            </button>
          </div>

          {/* Email + Password */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-5 gap-y-3 w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              className="outline-none w-full p-2 px-4 border rounded-full text-sm sm:text-base text-black"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              className="outline-none w-full p-2 px-4 border rounded-full text-sm sm:text-base text-black"
              required
            />

            {/* Submit button */}
            <button
              type="submit"
              className="mt-4 text-lg sm:text-xl cursor-pointer text-black bg-white py-2 w-full rounded-md hover:bg-gray-200 transition"
            >
              {loading ? "Loading..." : "LOGIN"}
            </button>
          </form>

          {/* Register link */}
          <div className="w-full text-center flex flex-col sm:flex-row gap-1 justify-center items-center mt-5 text-sm sm:text-base font-semibold">
            <p>You don’t have an account?</p>
            <Link href="/register" className="text-blue-300 underline">
              Register
            </Link>
          </div>

          {/* Error message */}
          {error && (
            <div className="w-full text-center mt-5 text-sm text-red-600">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
