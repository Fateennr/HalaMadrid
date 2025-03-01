"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HallOfFamePage() {
  const legends = [
    { name: "Alfredo Di Stéfano", years: "1953-1964", image: "/placeholder.svg?height=200&width=200" },
    { name: "Cristiano Ronaldo", years: "2009-2018", image: "/placeholder.svg?height=200&width=200" },
    { name: "Raúl González", years: "1994-2010", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white p-24">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hall of Fame
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {legends.map((legend, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={legend.image || "/placeholder.svg"}
              alt={legend.name}
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold">{legend.name}</h2>
            <p className="text-gray-300">{legend.years}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

