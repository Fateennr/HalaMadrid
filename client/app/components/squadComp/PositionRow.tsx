"use client"

import { useRef, useState, useEffect } from "react"
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
  displayCount: number 
}

export default function PositionRow({ title, players, onPlayerClick, displayCount }: PositionRowProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const cardWidth = 252

  // Check if we need arrows (if there are more players than displayCount)
  useEffect(() => {
    setShowRightArrow(players.length > displayCount)
  }, [players.length, displayCount])

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const newIndex =
      direction === "left" ? Math.max(0, currentIndex - 1) : Math.min(players.length - displayCount, currentIndex + 1)

    setCurrentIndex(newIndex)

    // Update arrow visibility
    setShowLeftArrow(newIndex > 0)
    setShowRightArrow(newIndex < players.length - displayCount)

    // Calculate scroll position based on updated card width
    const scrollAmount = newIndex * cardWidth

    carouselRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  // Handle scroll event to update arrow visibility
  const handleScroll = () => {
    if (!carouselRef.current) return

    const scrollPosition = carouselRef.current.scrollLeft
    const approximateIndex = Math.round(scrollPosition / cardWidth)

    setCurrentIndex(approximateIndex)
    setShowLeftArrow(approximateIndex > 0)
    setShowRightArrow(approximateIndex < players.length - displayCount)
  }

  // Calculate container width based on displayCount and updated card width
  const containerWidth = displayCount * cardWidth

  return (
    <div className="mb-16">
      {" "}
      {/* Increased bottom margin for more vertical spacing */}
      <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "#1E4C9A" }}>
        {" "}
        {/* Increased bottom margin */}
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
              width: "40px",
              height: "40px", 
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: "translateY(-50%) translateX(-50%)",
            }}
          >
            <ChevronLeft size={24} /> {/* Slightly larger */}
          </button>
        )}

        {/* Carousel container with fixed width based on displayCount */}
        <div className="mx-auto" style={{ maxWidth: `${containerWidth}px`, overflow: "hidden" }}>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-4 hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
            }}
            onScroll={handleScroll}
          >
            <div className="flex">
              {players.map((player) => (
                <PlayerCard key={player._id} player={player} onCardClick={() => onPlayerClick(player)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right scroll button */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            style={{
              backgroundColor: "white",
              width: "40px", // Slightly larger
              height: "40px", // Slightly larger
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              transform: "translateY(-50%) translateX(50%)",
            }}
          >
            <ChevronRight size={24} /> {/* Slightly larger */}
          </button>
        )}
      </div>
    </div>
  )
}
