"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function SquadPage() {
  const players = [
    { name: "Karim Benzema", position: "Forward", number: 9 },
    { name: "Luka Modric", position: "Midfielder", number: 10 },
    { name: "Thibaut Courtois", position: "Goalkeeper", number: 1 },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800 p-24">
      <motion.h1
        className="text-4xl font-bold mb-8 text-blue-900"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Squad & Player Profiles
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {players.map((player, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover-lift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={`/placeholder.svg?height=100&width=100`}
              alt={player.name}
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-blue-900">{player.name}</h2>
            <p className="text-gray-600 font-medium">
              {player.position} - #{player.number}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

