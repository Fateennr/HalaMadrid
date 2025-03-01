"use client"

import { motion } from "framer-motion"

export default function MatchesPage() {
  const matches = [
    { opponent: "Barcelona", date: "2023-07-15", competition: "La Liga" },
    { opponent: "Manchester City", date: "2023-07-22", competition: "Champions League" },
    { opponent: "Atletico Madrid", date: "2023-07-29", competition: "La Liga" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Match Center
      </motion.h1>
      <div className="space-y-6">
        {matches.map((match, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-2">Real Madrid vs {match.opponent}</h2>
            <p className="text-gray-300">
              {match.date} - {match.competition}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

