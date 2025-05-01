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
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow:
          "0 15px 30px rgba(30, 76, 154, 0.3), 0 5px 15px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
      }}
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
        boxShadow:
          "0 8px 20px rgba(30, 76, 154, 0.15), 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Subtle gradient overlay for depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(30,76,154,0.05) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Card Header with Position */}
      <div
        style={{
          backgroundColor: "#1E4C9A",
          padding: "10px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          background: "linear-gradient(90deg, #1E4C9A 0%, #2A5CAA 100%)",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "12px",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          {player.position}
        </span>
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
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          {player.number}
        </div>
      </div>

      {/* Player Image */}
      <div
        style={{
          position: "relative",
          height: "180px",
          backgroundColor: "#f5f5f5",
          zIndex: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          borderBottom: "1px solid rgba(30,76,154,0.1)",
        }}
      >
        <Image
          src={player.imageLink || "/placeholder.svg?height=180&width=220"}
          alt={player.name}
          fill
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        {/* Subtle gradient overlay on image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(180deg, rgba(255,255,255,0) 70%, rgba(30,76,154,0.05) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Player Info */}
      <div
        style={{
          padding: "16px",
          position: "relative",
          zIndex: 2,
          background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,247,250,1) 100%)",
        }}
      >
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "6px",
            color: "#1a1a1a",
          }}
        >
          {player.name}
        </h3>
        <p
          style={{
            color: "#666",
            fontSize: "10px",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {player.nationality}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "8px",
            padding: "8px 0",
            borderTop: "1px solid rgba(30,76,154,0.08)",
          }}
        >
          <div>
            <span
              style={{
                color: "#666",
                fontSize: "14px",
                display: "block",
                marginBottom: "2px",
              }}
            >
              Age: {player.age}
            </span>
            <span
              style={{
                color: "#666",
                fontSize: "14px",
              }}
            >
              Role: {player.role}
            </span>
          </div>

          {/* Overall Rating */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span
              style={{
                color: "#666",
                fontSize: "12px",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              Overall
            </span>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                border: `3px solid ${getOverallColor(player.overall)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "18px",
                color: getOverallColor(player.overall),
                boxShadow: "0 2px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.8) inset",
                background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
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
