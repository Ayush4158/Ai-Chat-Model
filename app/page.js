'use client'

import Video from "@/components/Video";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className="h-screen w-screen">

      <div className="absolute h-full w-full">
        <Video className='w-full h-full' />
      </div>
    <div className="flex relative flex-col justify-between items-center py-10 h-full w-full">


      <div className="text-center text-[5vw] font-bold leading-[5vw]">
        <div>Empowering Ideas</div> 
        <div className="flex gap-x-2">with the <div className="flex justify-center overflow-hidden items-center">
          <Video className='h-[6vw] w-[13vw] rounded-full object-cover' /></div> Next</div>
        <div>Generation of AI</div>
      </div>

      <div className="w-[80%] text-center text-[1.8vw] font-semibold leading-tight">
        <p>Chat with AI that actually gets you, brainstorm wild ideas in seconds, or solve problems before your coffee even cools down. The future isn’t coming, it’s already here, and it’s powered by us.</p>
      </div>

      <div className='flex items-center justify-center gap-3 font-bold mb-2'>
      <div className='border-3 hover:border-green-400 leading-none hover:text-green-400 flex px-10 border-white rounded-full uppercase'>
        <Link className='text-[6vw] ' href='/project'>AI Search</Link>
      </div>
      
      <div className='border-3 hover:border-green-400 hover:text-green-400 flex leading-none py-1 px-10 border-white rounded-full uppercase'>
        <Link className='text-[6vw] ' href='/login'>Login</Link>
      </div>
      
    </div>

    </div>
    </div>
  );
}
