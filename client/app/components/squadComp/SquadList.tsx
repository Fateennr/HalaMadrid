"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlayerCard, type Player } from "@/app/components/player-card"
import { PlayerModal } from "@/app/components/player-modal"
import { PageHeader } from "@/components/ui/page-header"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function SquadList({ squad }: { squad: Player[] }) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  if (!squad.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">
        <p className="text-xl">No squad data found.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        <PageHeader
          title="Real Madrid"
          accentText="Squad"
          description="The current roster of players representing the most successful club in European football history."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {squad.map((p) => (
            <PlayerCard key={p._id} player={p} onClick={() => setSelectedPlayer(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}
