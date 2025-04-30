"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Clock, ImageIcon, Send, Trophy } from "lucide-react"
import ChatBox from "../components/ChatBox"

// Types
interface Post {
  _id: string
  author: {
    _id: string
    username: string
  }
  avatar: string
  content: string
  image?: string
  likes: number
  createdAt: string
}

export default function FanZonePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      fetchPosts()
    }
  }, [router])

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fanzone/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch posts")
      }

      const data = await res.json()
      setPosts(data)
    } catch (err: any) {
      console.error("Error fetching posts:", err)
      setError("Failed to load posts. Please try again later.")
    }
  }

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle post submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError("Post content cannot be empty")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const imageData = image // This is already base64 from FileReader

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fanzone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          image: imageData,
          avatar: "/placeholder.svg",
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to create post")
      }

      // Reset form
      setContent("")
      setImage(null)
      setImageFile(null)

      // Refresh posts
      fetchPosts()
    } catch (err: any) {
      console.error("Error creating post:", err)
      setError(err.message || "Failed to create post")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle like post
  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fanzone/${postId}/like`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to like post")
      }

      // Update post likes in the UI
      setPosts(posts.map((post) => (post._id === postId ? { ...post, likes: post.likes + 1 } : post)))
    } catch (err: any) {
      console.error("Error liking post:", err)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header section with animation */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block"
            animate={{
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Real Madrid CF</h1>
          </motion.div>
          <h2 className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">Fan Zone</h2>
          <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Connect with fellow Madridistas and share your passion for the greatest club in football history.
          </p>
        </motion.div>



        {/* Create Post Form */}
        <motion.div
          className="bg-white rounded-xl p-6 mb-8 shadow-md border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Share with fellow fans</h2>
          </div>

          {error && (
            <motion.p
              className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-50 text-gray-800 placeholder-gray-500 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] mb-4"
              placeholder="What's on your mind, Madridista?"
            />

            {image && (

              <motion.div
                className="relative mb-4 overflow-hidden rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img src={image || "/placeholder.svg"} alt="Preview" className="w-full max-h-[300px] object-contain" />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setImageFile(null)
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  &times;
                </button>
              </motion.div>

            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 transition-colors">
                <ImageIcon size={20} />
                <span className="font-medium">Add Image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  "Posting..."
                ) : (
                  <>
                    <Send size={18} />
                    Post
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Posts List */}
        <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
          {posts.length === 0 ? (
            <motion.div
              className="text-center p-12 bg-white rounded-xl shadow-md border border-gray-200"
              variants={item}
            >
              <p className="text-gray-500 mb-4">No posts yet. Be the first to share!</p>
              <div className="h-1 w-24 bg-blue-200 mx-auto rounded-full"></div>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                variants={item}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                    <img
                      src={post.avatar || "https://ui-avatars.com/api/?name=" + (post.author?.username || "User")}
                      alt={post.author?.username || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.author?.username || "Anonymous"}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-gray-700">{post.content}</p>

                {post.image && (

                  <motion.div
                    className="mb-4 overflow-hidden rounded-lg border border-gray-200"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full rounded-lg object-contain"
                      style={{
                        maxHeight: "500px",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </motion.div>

                )}

                <div className="flex items-center gap-6 text-gray-500 pt-2 border-t border-gray-100">
                  <motion.button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart size={18} />
                    <span className="font-medium">{post.likes}</span>
                  </motion.button>
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  
            
                  </motion.div>
                </div>

              </motion.div>
            ))
          )}
        </motion.div>

        {/* Fan stats section */}
        <motion.div
          className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Fan Community Guidelines</h3>
          <ul className="space-y-4">
            <motion.li
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Trophy className="text-blue-500 mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-700">Respect fellow Madridistas and maintain a positive environment</span>
            </motion.li>
            <motion.li
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <Trophy className="text-blue-500 mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-700">Share your passion, memories, and support for Real Madrid</span>
            </motion.li>
            <motion.li
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Trophy className="text-blue-500 mt-1 flex-shrink-0" size={20} />
              <span className="text-gray-700">Help new fans learn about our rich history and traditions</span>
            </motion.li>
          </ul>
        </motion.div>
      </div>
      <ChatBox />
    </div>
  )
}
