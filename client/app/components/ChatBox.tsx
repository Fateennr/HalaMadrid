"use client"

import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { Send } from "lucide-react"

interface ChatMessage {
  author: string
  content: string
  time: string
}

export default function ChatBox() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API_URL as string)
    setSocket(s)

    s.emit("join", "global-chat") // join global room
    s.on("chat", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      s.disconnect()
    }
  }, [])

  // auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  const send = () => {
    if (!input.trim() || !socket) return
    const msg: ChatMessage = {
      author: localStorage.getItem("username") || "Anonymous",
      content: input,
      time: new Date().toISOString(),
    }
    socket.emit("chat", msg)
    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col z-50">
      {/* header */}
      <div className="px-4 py-2 bg-blue-600 text-white rounded-t-lg font-semibold">Global Chat</div>
      {/* messages */}
      <div ref={scrollRef} className="flex-1 px-3 py-2 overflow-y-auto space-y-2 bg-gray-50 max-h-64">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="font-semibold">{m.author}</span>{" "}
            <span className="text-gray-400 text-xs">{new Date(m.time).toLocaleTimeString()}</span>
            <div>{m.content}</div>
          </div>
        ))}
      </div>
      {/* input */}
      <div className="px-3 py-2 border-t border-gray-200 flex items-center">
        <input
          className="flex-1 px-2 py-1 border rounded-l-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
        />
        <button onClick={send} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md">
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
