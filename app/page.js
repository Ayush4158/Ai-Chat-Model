'use client'

import Video from "@/components/Video";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Fullscreen Video Background */}
      <Video className='absolute top-0 left-0 w-full h-full z-0' />

      {/* Overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col justify-between items-center h-full py-10 px-5">

        {/* Hero Heading */}
        <div className="text-center text-[5vw] md:text-[4vw] lg:text-[3vw] font-extrabold leading-[1.1] text-white">
          <div>Empowering Ideas</div>
          <div className="flex gap-x-2 justify-center items-center mt-2">
            with the 
            <div className="flex justify-center items-center mx-2 rounded-full overflow-hidden">
              <Video className='h-[6vw] w-[13vw]' />
            </div>
            Next
          </div>
          <div>Generation of AI</div>
        </div>

        {/* Subtext */}
        <div className="w-[90%] md:w-[70%] text-center text-[1.8vw] md:text-[1.4vw] lg:text-[1.1vw] font-medium leading-snug text-white mt-6">
          Chat with AI that actually gets you, brainstorm wild ideas in seconds, or solve problems before your coffee even cools down. The future isn’t coming, it’s already here, and it’s powered by us.
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
          <Link href='/ai-tool' className='px-12 py-3 rounded-full border-2 border-green-400 text-white font-bold uppercase text-[5vw] md:text-[1.2vw] hover:bg-green-400 hover:text-black transition-all duration-300'>
            AI Search
          </Link>
          <Link href='/login' className='px-12 py-3 rounded-full border-2 border-green-400 text-white font-bold uppercase text-[5vw] md:text-[1.2vw] hover:bg-green-400 hover:text-black transition-all duration-300'>
            Login
          </Link>
        </div>

      </div>
    </div>
  )
}
