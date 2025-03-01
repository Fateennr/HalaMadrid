"use client"

import { motion } from "framer-motion"

export default function FanZonePage() {
  const posts = [
    { title: "Best Real Madrid moments", author: "MadridFan1902", comments: 42 },
    { title: "Transfer rumors discussion", author: "FootballExpert", comments: 78 },
    { title: "Match day rituals", author: "WhiteArmy", comments: 23 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Fan Interaction
      </motion.h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-300">Posted by: {post.author}</p>
            <p className="text-gray-400">{post.comments} comments</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

