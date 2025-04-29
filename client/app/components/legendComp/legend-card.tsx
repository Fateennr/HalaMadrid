"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

export interface Legend {
  id: number
  name: string
  nickname: string
  years: string
  position: string
  image: string
  achievements: string[]
  bio: string
  quote: string
}

interface LegendCardProps {
  legend: Legend
  onClick: () => void
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
}

export function LegendCard({ legend, onClick }: LegendCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 border border-gray-200"
      variants={itemVariants}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative h-80 overflow-hidden">
        <Image src={legend.image || "/placeholder.svg"} alt={legend.name} fill className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
            {legend.position}
          </span>
        </div>
      </div>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-1 text-gray-800">{legend.name}</h2>
        <p className="text-blue-600 font-medium mb-3">{legend.years}</p>
        <div className="flex justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-blue-600" fill="currentColor" />
          ))}
        </div>
        <button className="mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors duration-300">
          View Tribute
        </button>
      </div>
    </motion.div>
  )
}
