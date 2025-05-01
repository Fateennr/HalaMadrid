"use client"

import { useState } from "react"
import PlayerCard from "./PlayerCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  // Group players by position/role
  const goalkeepers = squad.filter((player) => player.role === "Goalkeeper")
  const defenders = squad.filter((player) => player.role === "Defender")
  const midfielders = squad.filter((player) => player.role === "Midfielder")
  const forwards = squad.filter((player) => player.role === "Forward")

  // Sort players by overall rating (highest first)
  const sortByRating = (players: Player[]) => {
    return [...players].sort((a, b) => b.overall - a.overall)
  }

  const filteredSquad = () => {
    switch (filter) {
      case "goalkeepers":
        return sortByRating(goalkeepers)
      case "defenders":
        return sortByRating(defenders)
      case "midfielders":
        return sortByRating(midfielders)
      case "forwards":
        return sortByRating(forwards)
      default:
        return sortByRating(squad)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Real Madrid Squad</h1>
        <p className="text-gray-600">Explore our first team players and their stats</p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-center">
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="all"
              onClick={() => setFilter("all")}
              className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
            >
              All Players
            </TabsTrigger>
            <TabsTrigger
              value="goalkeepers"
              onClick={() => setFilter("goalkeepers")}
              className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
            >
              Goalkeepers
            </TabsTrigger>
            <TabsTrigger
              value="defenders"
              onClick={() => setFilter("defenders")}
              className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
            >
              Defenders
            </TabsTrigger>
            <TabsTrigger
              value="midfielders"
              onClick={() => setFilter("midfielders")}
              className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
            >
              Midfielders
            </TabsTrigger>
            <TabsTrigger
              value="forwards"
              onClick={() => setFilter("forwards")}
              className="data-[state=active]:bg-[#1E4C9A] data-[state=active]:text-white"
            >
              Forwards
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSquad().map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goalkeepers" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSquad().map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="defenders" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSquad().map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="midfielders" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSquad().map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forwards" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSquad().map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
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
