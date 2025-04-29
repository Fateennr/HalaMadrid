"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Trophy } from "lucide-react"
import type { MatchItem } from "./MatchHero"

interface MatchCardProps {
  match: MatchItem
  index: number
}

export default function MatchCard({ match, index }: MatchCardProps) {
  const matchDate = new Date(match.date)

  // Format date and time
  const formattedDate = matchDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const formattedTime = matchDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <motion.article
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <Trophy className="h-4 w-4 text-blue-600" />
          <span className="text-blue-600 text-sm font-medium">{match.competition}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <Image src={match.homeLogo || "/placeholder.svg"} alt={match.home} fill className="object-contain" />
            </div>
            <span className="font-medium text-gray-800">{match.home}</span>
          </div>

          <span className="font-bold text-gray-500 mx-2">vs</span>

          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-800">{match.away}</span>
            <div className="relative h-10 w-10">
              <Image src={match.awayLogo || "/placeholder.svg"} alt={match.away} fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 text-sm">
              {formattedDate} • {formattedTime}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 text-sm">{match.venue}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
