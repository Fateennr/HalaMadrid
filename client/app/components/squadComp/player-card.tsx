"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export interface Player {
  _id: string;                 // your Mongo id
  apiFootballId: number;       // new field
  name: string;
  position: string;
  number: number;
  nationality: string;
  age: number;
  imageLink?: string;
}

interface PlayerCardProps {
  player: Player
  onClick: () => void
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        flex flex-col overflow-hidden rounded-xl bg-white
        transform transition-all duration-300 border border-gray-200
        hover:-translate-y-2 hover:shadow-lg cursor-pointer
      "
      onClick={onClick}
    >
      {/* Top half: player image with gradient overlay */}
      <div className="relative h-80 bg-gradient-to-b from-blue-50 to-blue-100">
        {player.imageLink && (
          <Image
            src={player.imageLink || "/placeholder.svg"}
            alt={player.name}
            fill
            className="object-cover object-top"
          />
        )}
        {/* Light overlay to match achievements page style */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-60" />
        {/* Position badge in bottom center of top half */}
        <div className="absolute bottom-4 w-full text-center">
          <span className="block text-blue-800 text-xl font-bold mb-1">#{player.number}</span>
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
            {player.position}
          </span>
        </div>
      </div>

      {/* Bottom half: white background, fixed padding */}
      <div className="bg-white p-6 text-center flex-1 flex flex-col justify-center">
        <h3 className="text-gray-800 text-2xl font-bold leading-snug">{player.name}</h3>
        <p className="text-blue-600 font-medium mt-2">{player.nationality}</p>
        <p className="text-gray-500 text-sm mt-1">{player.age} yrs</p>
      </div>
    </motion.div>
  )
}
