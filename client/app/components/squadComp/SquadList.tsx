"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PlayerCard from "./PlayerCard"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

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

interface SquadListProps {
  squad: Player[]
}

export default function SquadList({ squad }: SquadListProps) {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [displayedSquad, setDisplayedSquad] = useState<Player[]>([])

  // Group players by position/role
  const goalkeepers = squad.filter((player) => player.role === "Goalkeeper")
  const defenders = squad.filter((player) => player.role === "Defender")
  const midfielders = squad.filter((player) => player.role === "Midfielder")
  const forwards = squad.filter((player) => player.role === "Forward")

  // Sort players by overall rating (highest first)
  const sortByRating = (players: Player[]) => {
    return [...players].sort((a, b) => b.overall - a.overall)
  }

  // Filter players based on current filter and search term
  useEffect(() => {
    let filteredPlayers: Player[] = []

    // First filter by role
    switch (filter) {
      case "goalkeepers":
        filteredPlayers = goalkeepers
        break
      case "defenders":
        filteredPlayers = defenders
        break
      case "midfielders":
        filteredPlayers = midfielders
        break
      case "forwards":
        filteredPlayers = forwards
        break
      default:
        filteredPlayers = squad
    }

    // Then filter by search term if present
    if (searchTerm.trim() !== "") {
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.nationality.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort and set the displayed squad
    setDisplayedSquad(sortByRating(filteredPlayers))
  }, [filter, searchTerm, squad, goalkeepers, defenders, midfielders, forwards])

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 style={{ color: "#1E4C9A" }} className="text-3xl md:text-4xl font-bold mb-2">
          Real Madrid Squad
        </h1>
        <p className="text-gray-600">Explore our first team players and their stats</p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setFilter}>
            <TabsList className="bg-white border border-gray-200 shadow-sm h-12 p-1">
              <TabsTrigger
                value="all"
                style={{
                  transition: "all 0.2s ease",
                }}
                className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
              >
                All Players
              </TabsTrigger>
              <TabsTrigger
                value="goalkeepers"
                style={{
                  transition: "all 0.2s ease",
                }}
                className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
              >
                Goalkeepers
              </TabsTrigger>
              <TabsTrigger
                value="defenders"
                style={{
                  transition: "all 0.2s ease",
                }}
                className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
              >
                Defenders
              </TabsTrigger>
              <TabsTrigger
                value="midfielders"
                style={{
                  transition: "all 0.2s ease",
                }}
                className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
              >
                Midfielders
              </TabsTrigger>
              <TabsTrigger
                value="forwards"
                style={{
                  transition: "all 0.2s ease",
                }}
                className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
              >
                Forwards
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search players..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4C9A] focus:border-transparent"
              style={{
                transition: "all 0.2s ease",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayedSquad.length > 0 ? (
              displayedSquad.map((player) => <PlayerCard key={player._id} player={player} />)
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No players found matching your criteria</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}



// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { PlayerCard, type Player } from "@/app/components/squadComp/player-card"
// import { PlayerModal } from "@/app/components/squadComp/player-modal"
// import { PageHeader } from "@/components/ui/page-header"

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1 } },
// }

// export default function SquadList({ squad }: { squad: Player[] }) {
//   const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

//   if (!squad.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">
//         <p className="text-xl">No squad data found.</p>
//       </div>
//     )
//   }

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="min-h-screen bg-gray-50 py-16"
//     >
//       <div className="max-w-6xl mx-auto px-4">
//         <PageHeader
//           title="Real Madrid"
//           accentText="Squad"
//           description="The current roster of players representing the most successful club in European football history."
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {squad.map((p) => (
//             <PlayerCard key={p._id} player={p} onClick={() => setSelectedPlayer(p)} />
//           ))}
//         </div>
//       </div>

//       <AnimatePresence>
//         {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
//       </AnimatePresence>
//     </motion.div>
//   )
// }
