"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Trophy } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export interface MatchItem {
  date: string
  competition: string
  home: string
  away: string
  homeLogo: string
  awayLogo: string
  venue: string
}

export default function MatchHero({ match }: { match: MatchItem }) {
  const matchDate = new Date(match.date)

  // Format date in a more readable way
  const formattedDate = matchDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format time separately
  const formattedTime = matchDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <section className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="Upcoming"
          accentText="Matches"
          description="Follow Real Madrid's schedule and never miss a game"
        />

        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div className="flex items-center space-x-2 mb-3">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">{match.competition}</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">Next Match</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{formattedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-5 w-5 flex items-center justify-center text-gray-500">
                      <span className="sr-only">Time</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    <span className="text-gray-700">{formattedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{match.venue}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-24 w-24 mx-auto">
                      <Image
                        src={match.homeLogo || "/placeholder.svg"}
                        alt={match.home}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 font-bold text-xl text-gray-800">{match.home}</p>
                  </motion.div>

                  <motion.div
                    className="mx-8 text-4xl font-bold text-gray-800"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    VS
                  </motion.div>

                  <motion.div
                    className="text-center"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-24 w-24 mx-auto">
                      <Image
                        src={match.awayLogo || "/placeholder.svg"}
                        alt={match.away}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 font-bold text-xl text-gray-800">{match.away}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
