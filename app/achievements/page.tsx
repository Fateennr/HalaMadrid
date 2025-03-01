"use client"

import { motion } from "framer-motion"

export default function AchievementsPage() {
  const achievements = [
    { title: "La Liga Titles", count: 35 },
    { title: "UEFA Champions League Trophies", count: 14 },
    { title: "FIFA Club World Cup Titles", count: 5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Historical Achievements
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{achievement.title}</h2>
            <p className="text-5xl font-bold text-yellow-400">{achievement.count}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

