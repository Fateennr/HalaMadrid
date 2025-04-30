"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/ui/page-header"
import { LegendCard, type Legend } from "@/app/components/legendComp/legend-card"
import { LegendModal } from "@/app/components/legendComp/legend-modal"

export default function HallOfFamePage() {
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null)
  const [legends, setLegends] = useState<Legend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLegends = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/legends`)
        if (!res.ok) {
          throw new Error("Failed to fetch legends")
        }
        const data = await res.json()
        setLegends(data)
      } catch (err) {
        console.error("Error fetching legends:", err)
        setError("Failed to load legends. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchLegends()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading legends...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <PageHeader
          title="Madridistas"
          accentText="Hall of Fame"
          description="Honoring the legendary figures who have defined the rich history of Real Madrid and left an indelible mark on the beautiful game."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {legends.map((legend) => (
            <LegendCard 
              key={legend._id} 
              legend={legend} 
              onClick={() => setSelectedLegend(legend)} 
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedLegend && (
            <LegendModal 
              legend={selectedLegend} 
              onClose={() => setSelectedLegend(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
