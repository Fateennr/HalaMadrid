"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Lexend } from "next/font/google"
import MatchCard from "@/app/components/matchComp/MatchCard"
import Image from "next/image"
import { ArrowRight, Trophy, Star, Calendar, ChevronRight, Award, Crown } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import type { NewsItem } from "@/app/components/newsComp/NewsHero"

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] })

export default function Home() {
  const [matches, setMatches] = useState([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoadingMatches, setIsLoadingMatches] = useState(true)
  const [isLoadingNews, setIsLoadingNews] = useState(true)

  // Fetch matches
  useEffect(() => {
    async function fetchMatches() {
      try {
        setIsLoadingMatches(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/matches`, {
          cache: "no-store",
        })
        if (!res.ok) {
          console.error("Error fetching matches:", await res.text())
          return
        }
        const data = await res.json()
        setMatches(data.slice(0, 3)) // Limit to the next 3 matches
      } catch (error) {
        console.error("Error fetching matches:", error)
      } finally {
        setIsLoadingMatches(false)
      }
    }

    fetchMatches()
  }, [])

  // Fetch news
  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoadingNews(true)
        const response = await axios.get<NewsItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/news`)
        setNews(response.data.slice(0, 3)) // Get only the first 3 news items
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setIsLoadingNews(false)
      }
    }

    fetchNews()
  }, [])

  const trophies = [
    {
      name: "La Liga",
      count: 35,
      icon: <Trophy className="w-full h-full text-yellow-500" />,
      description: "Most titles in Spanish league history",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "UEFA Champions League",
      count: 14,
      icon: <Crown className="w-full h-full text-yellow-500" />,
      description: "Most European Cup/UCL trophies ever",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      name: "Copa del Rey",
      count: 20,
      icon: <Award className="w-full h-full text-yellow-500" />,
      description: "Second most in Spanish football",
      color: "from-red-500 to-red-700",
    },
  ]

  return (
    <main className={`min-h-screen bg-gray-50 ${lexend.className}`}>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="rm1.jpg" alt="Santiago Bernabéu Stadium" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-blue-300">Real Madrid</span> Fan Page
            </h1>
            <p className="text-xl mb-8">The home of the most successful football club in history</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/squad"
                className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition flex items-center"
              >
                Meet the Squad <ChevronRight className="ml-2" />
              </Link>
              <Link
                href="/matches"
                className="bg-blue-700 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition flex items-center"
              >
                Upcoming Matches <ChevronRight className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Quote Section */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -top-8 -left-8 text-8xl text-blue-200 opacity-50">"</div>
            <h2 className="text-3xl font-bold mb-4 text-blue-900 relative z-10">
              Fear doesn't exist in football, especially for Real Madrid.
            </h2>
            <div className="absolute -bottom-8 -right-8 text-8xl text-blue-200 opacity-50">"</div>
          </div>
          <p className="text-xl text-gray-600 italic">- Luka Modric</p>
        </motion.div>

        {/* Upcoming Matches Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-blue-800 flex items-center">
              <Calendar className="mr-3 text-blue-600" />
              Upcoming Matches
            </h2>
            <Link href="/matches" className="text-blue-600 hover:text-blue-800 transition flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoadingMatches ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match, index) => (
                <MatchCard key={index} match={match} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No upcoming matches found.</p>
            </div>
          )}
        </motion.section>

        {/* News & Highlights Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-blue-800 flex items-center">
              <Star className="mr-3 text-blue-600" />
              Latest News & Highlights
            </h2>
            <Link href="/news" className="text-blue-600 hover:text-blue-800 transition flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 w-1/4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <motion.article
                  key={index}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-0 overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-44 w-full">
                    <Image src={item.imageUrl || "/fallback.jpg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(item.date).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    </p>
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-800">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-3">{item.summary}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No news available.</p>
            </div>
          )}
        </motion.section>

        {/* Trophy Cabinet Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-blue-800 flex items-center">
              <Trophy className="mr-3 text-blue-600" />
              Trophy Cabinet
            </h2>
            <Link href="/achievements" className="text-blue-600 hover:text-blue-800 transition flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trophies.map((trophy, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden relative"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                {/* Trophy header with gradient background */}
                <div className={`bg-gradient-to-r ${trophy.color} p-6 text-white relative`}>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">{trophy.icon}</div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{trophy.name}</h3>
                    <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                      <div className="w-12 h-12">{trophy.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Trophy content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600 text-sm">{trophy.description}</p>
                    <motion.div
                      className="text-5xl font-bold text-blue-600"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {trophy.count}
                    </motion.div>
                  </div>

                  {/* Trophy visualization bar */}
                  <div className="h-2 bg-gray-100 w-full rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${trophy.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(trophy.count / 35) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Club Values Banner */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="bg-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-blue-200">Striving for perfection in every match and competition</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tradition</h3>
              <p className="text-blue-200">Honoring our rich history and legendary achievements</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="bg-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ambition</h3>
              <p className="text-blue-200">Always looking forward to the next challenge and victory</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
