"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PlayerCard from "./PlayerCard"

interface PlayerStats {
  passing: number
  vision: number
  ballControl: number
  longShots: number
  creativity: number
  workRate: number
}

interface Player {
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

interface PositionRowProps {
  title: string
  players: Player[]
  onPlayerClick: (player: Player) => void
}

export default function PositionRow({ title, players, onPlayerClick }: PositionRowProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const scrollAmount = 200 // Adjust as needed
    const currentScroll = carouselRef.current.scrollLeft
    const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    })

    // Update arrow visibility after scrolling
    setTimeout(() => {
      if (!carouselRef.current) return

      setShowLeftArrow(carouselRef.current.scrollLeft > 0)
      setShowRightArrow(
        carouselRef.current.scrollLeft < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10,
      )
    }, 300)
  }

  // Handle scroll event to update arrow visibility
  const handleScroll = () => {
    if (!carouselRef.current) return

    setShowLeftArrow(carouselRef.current.scrollLeft > 0)
    setShowRightArrow(
      carouselRef.current.scrollLeft < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10,
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4 text-center" style={{ color: "#1E4C9A" }}>
        {title}
      </h2>

      <div className="relative">
        {/* Left scroll button */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            style={{
              backgroundColor: "white",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: "translateY(-50%) translateX(-50%)",
            }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Carousel container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-4 hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
          onScroll={handleScroll}
        >
          <div className="flex justify-center min-w-full">
            {players.map((player) => (
              <PlayerCard key={player._id} player={player} onCardClick={() => onPlayerClick(player)} />
            ))}
          </div>
        </div>

        {/* Right scroll button */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            style={{
              backgroundColor: "white",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: "translateY(-50%) translateX(50%)",
            }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
