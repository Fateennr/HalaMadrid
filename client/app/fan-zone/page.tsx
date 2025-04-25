"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, Send, Users } from "lucide-react"

export default function FanZonePage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "MadridFan1902",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "What an incredible victory last night! Vinicius Jr. was absolutely unstoppable! 🔥⚽",
      image: "/placeholder.svg?height=400&width=600",
      likes: 245,
      comments: 42,
      time: "2h ago",
      isLiked: false,
    },
    {
      id: 2,
      author: "HalaMadrid",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Transfer window rumors: Who do you think we should sign next season? I'm hoping for a new defensive midfielder.",
      image: "",
      likes: 178,
      comments: 78,
      time: "5h ago",
      isLiked: true,
    },
    {
      id: 3,
      author: "BernabeuLegend",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "My match day ritual: wearing the 2017 jersey, same spot on the couch, and my lucky scarf. What's yours?",
      image: "/placeholder.svg?height=400&width=600",
      likes: 132,
      comments: 23,
      time: "1d ago",
      isLiked: false,
    },
  ])

  const [activeChat, setActiveChat] = useState("general")
  const [chatMessage, setChatMessage] = useState("")

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c3d] to-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white">
            <span className="text-[#febe10]">Madridistas</span> Fan Zone
          </h1>
          <div className="flex space-x-4">
            <button className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition">
              Create Post
            </button>
            <button className="bg-[#febe10] text-[#0b1c3d] px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition">
              Join Chat
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Social Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create post box */}
            <motion.div
              className="bg-white bg-opacity-10 p-4 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                  <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                </div>
                <input
                  type="text"
                  placeholder="Share your thoughts about Real Madrid..."
                  className="bg-white bg-opacity-10 text-white placeholder-gray-400 p-2 px-4 rounded-full flex-1 focus:outline-none focus:ring-2 focus:ring-[#febe10]"
                />
              </div>
              <div className="flex justify-between">
                <button className="text-gray-300 hover:text-white transition">Add Photo</button>
                <button className="bg-[#febe10] text-[#0b1c3d] px-4 py-1 rounded-full font-medium hover:bg-opacity-90 transition">
                  Post
                </button>
              </div>
            </motion.div>

            {/* Posts */}
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white bg-opacity-10 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                    <img src={post.avatar || "/placeholder.svg"} alt={`${post.author}'s avatar`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.author}</h3>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                </div>

                <p className="mb-4">{post.content}</p>

                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-10">
                  <button className="flex items-center space-x-1 group" onClick={() => toggleLike(post.id)}>
                    <Heart
                      className={`h-5 w-5 ${post.isLiked ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-500"}`}
                    />
                    <span className={`${post.isLiked ? "text-red-500" : "text-gray-400 group-hover:text-red-500"}`}>
                      {post.likes}
                    </span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white bg-opacity-10 rounded-xl overflow-hidden h-[600px] flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-[#0b1c3d] p-4 border-b border-white border-opacity-10">
                <h2 className="text-xl font-bold flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Madridistas Chat
                </h2>
              </div>

              <div className="p-3 border-b border-white border-opacity-10">
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${activeChat === "general" ? "bg-[#febe10] text-[#0b1c3d]" : "bg-white bg-opacity-10"}`}
                    onClick={() => setActiveChat("general")}
                  >
                    General
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${activeChat === "matchday" ? "bg-[#febe10] text-[#0b1c3d]" : "bg-white bg-opacity-10"}`}
                    onClick={() => setActiveChat("matchday")}
                  >
                    Match Day
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${activeChat === "transfers" ? "bg-[#febe10] text-[#0b1c3d]" : "bg-white bg-opacity-10"}`}
                    onClick={() => setActiveChat("transfers")}
                  >
                    Transfers
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
                    <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                  </div>
                  <div className="bg-white bg-opacity-5 rounded-lg p-2 max-w-[80%]">
                    <p className="text-xs text-[#febe10] font-medium">CarlosFan88</p>
                    <p className="text-sm">Did you see that pass from Modric last night? Pure magic!</p>
                    <p className="text-xs text-gray-400 mt-1">10:32 AM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
                    <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                  </div>
                  <div className="bg-white bg-opacity-5 rounded-lg p-2 max-w-[80%]">
                    <p className="text-xs text-[#febe10] font-medium">ViniJr20</p>
                    <p className="text-sm">
                      I think we need to strengthen our defense this summer. What do you all think?
                    </p>
                    <p className="text-xs text-gray-400 mt-1">10:45 AM</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-[#febe10] bg-opacity-20 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">A new center back would be perfect.</p>
                    <p className="text-xs text-gray-400 mt-1">10:47 AM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
                    <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                  </div>
                  <div className="bg-white bg-opacity-5 rounded-lg p-2 max-w-[80%]">
                    <p className="text-xs text-[#febe10] font-medium">BernabeuLegend</p>
                    <p className="text-sm">Anyone going to the next home game? We could meet up!</p>
                    <p className="text-xs text-gray-400 mt-1">11:02 AM</p>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-white border-opacity-10">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="bg-white bg-opacity-10 text-white placeholder-gray-400 p-2 rounded-lg flex-1 focus:outline-none focus:ring-1 focus:ring-[#febe10]"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <button className="bg-[#febe10] text-[#0b1c3d] p-2 rounded-lg">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

