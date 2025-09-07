"use client"
import Link from 'next/link'
import React from 'react'
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <nav className="w-full flex justify-between items-center  px-10 py-4 border-b border-gray-800">
        <Link href="/" className="text-2xl font-bold text-purple-400">
          Intellio
        </Link>

        <div className='p-2 px-4 border border-purple-400 rounded-full text-white hover:bg-purple-400'>
          {
            session ? <p>{session.user.email}</p> : "Please Login"
          }
        </div>
      </nav>
  )
}

export default Header
