"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

interface PlayerStats {
  passing: number
  vision: number
  ballControl: number
  longShots: number
  creativity: number
  workRate: number
}

interface PlayerProps {
  _id: string
  name: string
  position: string
  role: string
  number: number
  nationality: string
  age: number
  imageLink: string
  appearances: number
  overall: number
  stats: PlayerStats
}

export default function PlayerCard({ player }: { player: PlayerProps }) {
  const [expanded, setExpanded] = useState(false)

  // Function to determine color based on stat value (FIFA style)
  const getStatColor = (value: number) => {
    if (value >= 90) return "bg-emerald-500"
    if (value >= 80) return "bg-green-500"
    if (value >= 70) return "bg-yellow-500"
    if (value >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  // Function to determine overall rating color
  const getOverallColor = (value: number) => {
    if (value >= 90) return "text-emerald-500"
    if (value >= 80) return "text-green-500"
    if (value >= 70) return "text-yellow-500"
    if (value >= 60) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        expanded ? "scale-105 shadow-xl" : "hover:shadow-lg hover:scale-102"
      }`}
    >
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="relative bg-gradient-to-r from-white to-gray-100 p-4">
          {/* Top section with player number and position */}
          <div className="flex justify-between items-start mb-2">
            <div className="bg-[#FEDF00] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {player.number}
            </div>
            <div className="bg-[#1E4C9A] text-white px-2 py-1 rounded text-xs font-semibold">{player.position}</div>
          </div>

          {/* Player image and basic info */}
          <div className="flex items-center">
            <div className="relative w-24 h-24 mr-4">
              <Image
                src={player.imageLink || "/placeholder.svg"}
                alt={player.name}
                fill
                className="object-cover rounded-full border-2 border-[#FEDF00]"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{player.name}</h3>
              <p className="text-gray-600 text-sm">{player.nationality}</p>
              <p className="text-gray-600 text-sm">{player.role}</p>
              <div className="flex items-center mt-1">
                <span className={`text-xl font-bold ${getOverallColor(player.overall)}`}>{player.overall}</span>
                <span className="text-gray-500 text-sm ml-1">OVR</span>
              </div>
            </div>
          </div>

          {/* Expand/collapse indicator */}
          <div className="flex justify-center mt-2">
            {expanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </div>
        </div>
      </div>

      {/* Expanded stats section */}
      {expanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Player Info</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-gray-500">Age:</span> {player.age}
                </p>
                <p>
                  <span className="text-gray-500">Appearances:</span> {player.appearances}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Overall Rating</h4>
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${getOverallColor(player.overall)}`}>{player.overall}</div>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-4 mb-2">Player Stats</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {Object.entries(player.stats).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs capitalize text-gray-600">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className={`text-xs font-semibold ${getOverallColor(value)}`}>{value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${getStatColor(value)}`} style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
