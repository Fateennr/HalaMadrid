"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Clock, ImageIcon, Send } from "lucide-react"

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
    e.preventDefault();

    if (!content.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const imageData = image; // This is already base64 from FileReader

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fanzone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          image: imageData,
          avatar: "/placeholder.svg"
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      // Reset form
      setContent("");
      setImage(null);
      setImageFile(null);

      // Refresh posts
      fetchPosts();
    } catch (err: any) {
      console.error("Error creating post:", err);
      setError(err.message || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c3d] to-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#febe10]">Madridistas</span> Fan Zone
        </motion.h1>

        {/* Create Post Form */}
        <motion.div
          className="bg-white bg-opacity-10 rounded-xl p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Share with fellow fans</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febe10] min-h-[100px] mb-4"
              placeholder="What's on your mind, Madridista?"
            />

            {image && (
              <div className="relative mb-4">
                <div className="relative w-full" style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full rounded-lg object-contain"
                    style={{ 
                      width: '500px',
                      height: '500px',
                      objectFit: 'contain',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null)
                      setImageFile(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-[#febe10] hover:text-[#febe10]/80">
                <ImageIcon size={20} />
                <span>Add Image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-[#febe10] text-[#0b1c3d] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {isLoading ? (
                  "Posting..."
                ) : (
                  <>
                    <Send size={18} />
                    Post
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">No posts yet. Be the first to share!</p>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-white bg-opacity-10 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={post.avatar || "https://ui-avatars.com/api/?name=" + (post.author?.username || "User")}
                      alt={post.author?.username || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.author?.username || "Anonymous"}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </div>

                <p className="mb-4">{post.content}</p>

                {post.image && (
                  <div className="mb-4">
                    <div className="relative w-full" style={{ maxWidth: '700px', margin: '0 auto' }}>
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full rounded-lg object-contain"
                        style={{ 
                          width: '700px',
                          height: '700px',
                          objectFit: 'contain',
                          backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-gray-400">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-1 hover:text-[#febe10] transition"
                  >
                    <Heart size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={18} />
                    <span>0</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
