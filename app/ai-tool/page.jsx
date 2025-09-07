'use client'

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState(true);
  const [streamChat, setStreamChat] = useState(false);

  const { data: session } = useSession();

  const chatRef = useRef(null);

  // Keep scroll at top (messages grow upwards)
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
  }, [response]);

  const buttonChat = () => {
    setChat(true);
    setStreamChat(false);
  };

  const buttonStreamChat = () => {
    setStreamChat(true);
    setChat(false);
  };

  const handleChat = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStreamChat = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            setResponse((prev) => data.content + prev); // prepend instead of append
          }
        }
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 flex flex-col items-center justify-center p-6 sm:p-10">
      <h1 className="text-3xl font-extrabold text-orange-400 mb-6 tracking-wide drop-shadow-lg">
        🚀 Get Started with AI Application
      </h1>

      <div className="w-full max-w-2xl flex flex-col bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        {/* Chat response container */}
        <div
          ref={chatRef}
          className="flex-1 min-h-[200px] max-h-[350px] overflow-y-auto p-5 flex flex-col-reverse"
        >
          {response ? (
            <p className="whitespace-pre-wrap text-gray-100 leading-relaxed">
              {response}
            </p>
          ) : (
            <p className="text-gray-500">Your AI response will appear here...</p>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-gray-900/80 border-t border-gray-700">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Toggle buttons */}
          <div className="flex items-center justify-center gap-4 my-4">
            {chat ? (
              <button className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center font-bold shadow-lg">
                Chat
              </button>
            ) : (
              <button
                onClick={buttonChat}
                className="w-16 h-16 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center font-bold transition"
              >
                Chat
              </button>
            )}

            {streamChat ? (
              <button className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center font-bold shadow-lg text-xs">
                Stream
              </button>
            ) : (
              <button
                onClick={buttonStreamChat}
                className="w-16 h-16 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center font-bold transition text-xs"
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
              {loading ? "Thinking..." : "Send"}
            </button>
          )}

          {streamChat && (
            <button
              onClick={handleStreamChat}
              className="w-full py-3 rounded-xl font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition duration-200"
            >
              {loading ? "Thinking..." : "Send (Stream)"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
