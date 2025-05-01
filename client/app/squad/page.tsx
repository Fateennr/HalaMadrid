"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PositionRow from "@/app/components/squadComp/PositionRow"
import PlayerStatsModal from "@/app/components/squadComp/PlayerStatsModal"

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

async function fetchSquad() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/squad`, {
      cache: "no-store",
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Failed to fetch squad")
    }

    return res.json()
  } catch (error) {
    console.error("Squad fetch error:", error)
    throw new Error("Unable to load squad data. Please try again later.")
  }
}

export default function SquadPage() {
  const [squadData, setSquadData] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getSquadData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchSquad()
        setSquadData(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    getSquadData()
  }, [])

  // Group players by position
  const forwards = squadData.filter((player) => player.role === "Forward")
  const midfielders = squadData.filter((player) => player.role === "Midfielder")
  const defenders = squadData.filter((player) => player.role === "Defender")
  const goalkeepers = squadData.filter((player) => player.role === "Goalkeeper")

  // Handle player card click
  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full animate-spin"
              style={{
                border: "4px solid #1E4C9A",
                borderTopColor: "transparent",
                animationDuration: "1s",
              }}
            ></div>
            <div
              className="absolute top-2 left-2 w-16 h-16 rounded-full animate-spin"
              style={{
                border: "4px solid #FEDF00",
                borderBottomColor: "transparent",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <p className="text-gray-600">Loading squad data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-screen bg-white"
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Squad</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#1E4C9A",
              transition: "background-color 0.2s ease",
            }}
            className="px-6 py-2 text-white rounded-md hover:bg-[#163a75] shadow-md"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 style={{ color: "#1E4C9A" }} className="text-3xl md:text-4xl font-bold mb-2">
            Real Madrid Squad
          </h1>
          <p className="text-gray-600">Explore our team in 4-4-2 formation</p>
        </motion.div>

        <div
          className="relative py-8 px-4"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('/placeholder.svg?height=800&width=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "16px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          {/* Formation layout with specific display counts */}
          <div className="space-y-16">
            {/* Forwards - Show 2 at a time */}
            <PositionRow title="Forwards" players={forwards} onPlayerClick={handlePlayerClick} displayCount={2} />

            {/* Midfielders - Show 4 at a time */}
            <PositionRow title="Midfielders" players={midfielders} onPlayerClick={handlePlayerClick} displayCount={4} />

            {/* Defenders - Show 4 at a time */}
            <PositionRow title="Defenders" players={defenders} onPlayerClick={handlePlayerClick} displayCount={4} />

            {/* Goalkeeper - Show 1 at a time */}
            <PositionRow title="Goalkeepers" players={goalkeepers} onPlayerClick={handlePlayerClick} displayCount={1} />
          </div>
        </div>
      </div>

      {/* Player Stats Modal */}
      <PlayerStatsModal player={selectedPlayer} isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Custom CSS for hiding scrollbars */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}






// import SquadList from "@/app/components/squadComp/SquadList"

// async function fetchSquad() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/squad`, {
//       cache: "no-store",
//     })

//     if (!res.ok) {
//       const errorData = await res.json()
//       throw new Error(errorData.message || "Failed to fetch squad")
//     }

//     return res.json()
//   } catch (error) {
//     console.error("Squad fetch error:", error)
//     throw new Error("Unable to load squad data. Please try again later.")
//   }
// }

// export default async function SquadPage() {
//   try {
//     const squadData = await fetchSquad()

//     if (!squadData) {
//       return <div>No squad data available</div>
//     }

//     return <SquadList squad={squadData} />
//   } catch (error) {
//     return (
//       <div className="text-center p-4">
//         <h2 className="text-red-500">Error loading squad data</h2>
//         <p>{error.message}</p>
//       </div>
//     )
//   }
// }
