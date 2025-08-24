'use client'

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [streaming, setStreaming] = useState("")
  const [loading, setLoading] = useState(false)
  const [streamResponse, setStreamResponse] = useState("")

  const handleChat = async () => {
    setLoading(true)
    setResponse("")
    try {
      const res = await fetch("/api/chat",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({message})
    })
    const data = await res.json()
    setResponse(data.response)

    } catch (error) {
      setResponse("Error: " + error.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>GET STARTED WITH AI APPLICATION</h1>

      <div>
        <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter you text message"
        rows={4}
        className="w-[100%], mb-8"
        />
      </div>
        <div>
          <button onClick={handleChat} className="p-4 text-white bg-orange-300">
            {loading? "Loading..." : 
              "Chat"
            }
          </button>
        </div>
        <div className="border border-white p-5 ">
          {
            response
          }
        </div>
    </div>
  );
}
