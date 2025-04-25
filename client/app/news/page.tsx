"use client"

import { motion } from "framer-motion"

export default function NewsPage() {
  const news = [
    { title: "Real Madrid wins La Liga", date: "2023-05-20" },
    { title: "Benzema scores hat-trick in Champions League", date: "2023-04-15" },
    { title: "New signing announced for upcoming season", date: "2023-06-01" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        News & Updates
      </motion.h1>
      <div className="space-y-6">
        {news.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-300">{item.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

