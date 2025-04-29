"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/ui/page-header"
import { LegendCard, type Legend } from "@/app/components/legend-card"
import { LegendModal } from "@/app/components/legend-modal"

export default function HallOfFamePage() {
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null)

  const legends = [
    {
      id: 1,
      name: "Alfredo Di Stéfano",
      nickname: "Saeta Rubia (Blond Arrow)",
      years: "1953-1964",
      position: "Forward",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "5x European Cup winner",
        "8x La Liga champion",
        "2x Ballon d'Or winner",
        "308 goals in 396 appearances",
      ],
      bio: "Alfredo Di Stéfano is widely regarded as the most important player in Real Madrid's history. His vision, versatility, and leadership transformed the club into a global powerhouse. Di Stéfano was instrumental in establishing Real Madrid's dominance in the European Cup, winning the first five editions of the tournament.",
      quote: "Real Madrid is not just a club, it's a religion that unites millions of people around the world.",
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      nickname: "CR7",
      years: "2009-2018",
      position: "Forward",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "4x Champions League winner with Real Madrid",
        "2x La Liga champion",
        "4x Ballon d'Or winner while at Real Madrid",
        "450 goals in 438 appearances",
      ],
      bio: "Cristiano Ronaldo's time at Real Madrid was nothing short of extraordinary. He became the club's all-time leading goalscorer in just nine seasons, breaking numerous records along the way. His rivalry with Barcelona's Lionel Messi pushed him to unprecedented heights, and his incredible athleticism, skill, and determination made him a Real Madrid icon.",
      quote: "I'm living a dream I never want to wake up from.",
    },
    {
      id: 3,
      name: "Raúl González",
      nickname: "El Capitán",
      years: "1994-2010",
      position: "Forward",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "3x Champions League winner",
        "6x La Liga champion",
        "323 goals in 741 appearances",
        "Real Madrid's captain for 7 years",
      ],
      bio: "Raúl embodied the values of Real Madrid like few others. Rising through the youth academy, he became the club's symbol for an entire generation. Known for his intelligence, leadership, and clinical finishing, Raúl was the Champions League's all-time top scorer until surpassed by Ronaldo and Messi. His famous kissing-the-ring celebration is etched in Madrid folklore.",
      quote: "Being captain of Real Madrid is a huge responsibility and an honor.",
    },
    {
      id: 4,
      name: "Toni Kroos",
      nickname: "The Sniper",
      years: "2014-2024",
      position: "Midfielder",
      image: "/placeholder.svg?height=400&width=400",
      achievements: [
        "5x Champions League winner",
        "4x La Liga champion",
        "4x FIFA Club World Cup winner",
        "Master of precision passing with 93% career pass completion",
      ],
      bio: "Toni Kroos redefined midfield excellence during his decade at Real Madrid. The German maestro's extraordinary vision, pinpoint passing, and tactical intelligence made him the metronome of Madrid's midfield. Never flashy but always essential, Kroos controlled games with remarkable composure and precision. His partnership with Luka Modrić and Casemiro formed one of the greatest midfield trios in football history.",
      quote: "I always try to be the solution, not the problem. That's my philosophy in football and in life.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
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
            <LegendCard key={legend.id} legend={legend} onClick={() => setSelectedLegend(legend)} />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedLegend && <LegendModal legend={selectedLegend} onClose={() => setSelectedLegend(null)} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
