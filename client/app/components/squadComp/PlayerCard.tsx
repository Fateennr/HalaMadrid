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
      className="cursor-pointer mx-4 mb-6"
      style={{
        width: "220px",
        height: "380px", 
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
          padding: "10px 14px", 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold", fontSize: "12px" }}>{player.position}</span>
        <div
          style={{
            backgroundColor: "#FEDF00",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "50%",
            width: "28px", 
            height: "28px", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          {player.number}
        </div>
      </div>

      {/* Player Image */}
      <div style={{ position: "relative", height: "180px", backgroundColor: "#f5f5f5" }}>
        {" "}
        {/* Increased height */}
        <Image
          src={player.imageLink || "/placeholder.svg?height=180&width=220"} // Updated dimensions
          alt={player.name}
          fill
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>

      {/* Player Info */}
      <div style={{ padding: "16px" }}>
        {" "}
        {/* Increased padding */}
        <h3 style={{ fontWeight: "bold", fontSize: "15px", marginBottom: "6px" }}>{player.name}</h3> {/* Larger font */}
        <p style={{ color: "#666", fontSize: "10px", marginBottom: "10px" }}>{player.nationality}</p>{" "}
        {/* Larger font */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
          <div>
            <span style={{ color: "#666", fontSize: "14px" }}>Age: {player.age}</span>
            <div style={{ marginTop: "4px" }}>
              <span style={{ color: "#666", fontSize: "14px" }}>Role: {player.role}</span>
            </div>
          </div>

          {/* Overall Rating */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#666", fontSize: "14px", marginBottom: "4px" }}>Overall</span>
            <div
              style={{
                width: "44px", // Larger rating circle
                height: "44px", // Larger rating circle
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                border: `3px solid ${getOverallColor(player.overall)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "18px", // Larger font
                color: getOverallColor(player.overall),
              }}
            >
              {player.overall}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
