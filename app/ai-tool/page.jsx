'use client'

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  
  const [chat, setChat] = useState(false)
  const [streamChat, setStreamChat] = useState(true)

  const buttonChat = () => {
    setChat(true)
    setStreamChat(false)
  }
  const buttonStreamChat = () => {
    setStreamChat(true)
    setChat(false)
  }

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

  const handleStreamChat = async () => {
    setLoading(true)
    setResponse("")
    try {
      const res = await fetch("/api/chat-stream",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({message})
    })
    
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while(true){
      const {done, value} = await reader.read()
      if(done) break;

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for(const line of lines){
        if(line.startsWith("data: ")){
          const data = JSON.parse(line.slice(6))
          setResponse((prev) => prev + data.content)
        }
      }

    }
    

    } catch (error) {
      setResponse("Error: " + error.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-400 mb-8 tracking-wide">
        🚀 Get Started with AI Application
      </h1>

      <div className="w-full max-w-2xl">
        <div className="mt-6 p-5 rounded-xl bg-gray-800 border border-gray-700 shadow-inner min-h-[100px]">
          {response ? (
            <p className="whitespace-pre-wrap text-gray-100">{response}</p>
          ) : (
            <p className="text-gray-500">Your AI response will appear here...</p>
          )}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your text message..."
          rows={4}
          className="w-full mt-5 p-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-6"
        />

        {/* Toggle buttons */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {chat ? (
            <button
              className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold shadow-md"
            >
              Chat
            </button>
          ) : (
            <button
              onClick={buttonChat}
              className="w-14 h-14 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center text-sm font-bold transition"
            >
              Chat
            </button>
          )}

          {streamChat ? (
            <button
              className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold shadow-md"
            >
              Stream
            </button>
          ) : (
            <button
              onClick={buttonStreamChat}
              className="w-14 h-14 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center text-xs font-bold transition"
            >
              Stream
            </button>
          )}
        </div>

        {/* Action button */}
        {chat && (
          <button
            onClick={handleChat}
            className="w-full py-3 rounded-xl font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition duration-200"
          >
            {loading ? "Thinking..." : "Chat"}
          </button>
        )}

        {streamChat && (
          <button
            onClick={handleStreamChat}
            className="w-full py-3 rounded-xl font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition duration-200"
          >
            {loading ? "Thinking..." : "Stream Chat"}
          </button>
        )}
      </div>
    </div>
  );
}
