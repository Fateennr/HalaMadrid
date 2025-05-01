"use client"
import Image from "next/image"
import { motion } from "framer-motion"

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
  onCardClick: () => void
}

export default function PlayerCard({ player, onCardClick }: { player: PlayerProps; onCardClick: () => void }) {
  // Function to determine overall rating color
  const getOverallColor = (value: number) => {
    if (value >= 90) return "#00AC69" // Green
    if (value >= 80) return "#7AE582" // Light Green
    if (value >= 70) return "#FFD166" // Yellow
    if (value >= 60) return "#F76A6A" // Orange-Red
    return "#EF476F" // Red
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onCardClick}
      className="cursor-pointer mx-2 mb-4"
      style={{
        width: "180px",
        height: "280px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Card Header with Position */}
      <div
        style={{
          backgroundColor: "#1E4C9A",
          padding: "8px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>{player.position}</span>
        <div
          style={{
            backgroundColor: "#FEDF00",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          {player.number}
        </div>
      </div>

      {/* Player Image */}
      <div style={{ position: "relative", height: "160px", backgroundColor: "#f5f5f5" }}>
        <Image
          src={player.imageLink || "/placeholder.svg?height=160&width=180"}
          alt={player.name}
          fill
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>

      {/* Player Info */}
      <div style={{ padding: "12px" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "4px" }}>{player.name}</h3>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>{player.nationality}</p>

        {/* Overall Rating */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#666", fontSize: "14px" }}>Overall</span>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              border: `2px solid ${getOverallColor(player.overall)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: getOverallColor(player.overall),
            }}
          >
            {player.overall}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
