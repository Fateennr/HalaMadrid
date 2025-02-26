"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function MediaPage() {
  const media = [
    { type: "image", title: "Team Celebration", src: "/placeholder.svg?height=200&width=300" },
    { type: "video", title: "Match Highlights", src: "https://example.com/video.mp4" },
    { type: "image", title: "Stadium Aerial View", src: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Multimedia Section
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {media.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {item.type === "image" ? (
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
            ) : (
              <video src={item.src} controls className="w-full rounded-lg mb-4" />
            )}
            <h2 className="text-2xl font-semibold">{item.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

