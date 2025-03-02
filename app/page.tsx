"use client"

import { motion } from "framer-motion"
import { Lexend } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const upcomingMatches = [
    { opponent: "Barcelona", date: "2023-07-15", competition: "La Liga" },
    { opponent: "Manchester City", date: "2023-07-22", competition: "Champions League" },
    { opponent: "Atletico Madrid", date: "2023-07-29", competition: "La Liga" },
  ]

  const trophies = [
    { name: "La Liga", count: 35 },
    { name: "UEFA Champions League", count: 14 },
    { name: "Copa del Rey", count: 20 },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.h1
        className="text-3xl font-bold mb-12 text-blue-900"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        "Fear doesn't exist in football, especially for Real Madrid." <i className="text-2xl text-black">- Luka Modric</i>
      </motion.h1>
      
      <motion.section
        className="mb-12 w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-800">Upcoming Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingMatches.map((match, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-medium mb-2">vs {match.opponent}</h3>
              <p className="text-gray-600 text-sm">{match.date}</p>
              <p className="text-blue-700 font-medium">{match.competition}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-12 w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-800">Highlights</h2>
        <div className="aspect-w-16 aspect-h-9">
          {/* <iframe
            className="w-full h-96 rounded-lg shadow-md"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Real Madrid Highlights"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </div>
      </motion.section>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
      <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

      <motion.section
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-800">Trophy Cabinet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trophies.map((trophy, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md text-center hover-grow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-medium mb-2">{trophy.name}</h3>
              <p className="text-4xl font-bold text-blue-900">{trophy.count}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}

