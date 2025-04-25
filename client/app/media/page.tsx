"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Search, Filter, X, Play } from "lucide-react"

export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  interface MediaItem {
    id: number;
    type: string;
    category: string;
    title: string;
    description: string;
    date: string;
    src: string;
    duration?: string;
    featured?: boolean;
  }
  
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const mediaItems = [
    {
      id: 1,
      type: "image",
      category: "training",
      title: "Morning Training Session",
      description: "The squad working on tactical drills at Valdebebas",
      date: "March 15, 2023",
      src: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      type: "image",
      category: "celebration",
      title: "Champions League Preparation",
      description: "Special training session before the big match",
      date: "April 22, 2023",
      src: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      type: "video",
      category: "skills",
      title: "Vinicius Jr. Skills Showcase",
      description: "Amazing dribbling practice with Vinicius",
      date: "May 10, 2023",
      src: "/placeholder.svg?height=400&width=600",
      duration: "2:34",
    },
    {
      id: 4,
      type: "image",
      category: "team",
      title: "Team Building Exercise",
      description: "Players enjoying team-building activities",
      date: "June 5, 2023",
      src: "/placeholder.svg?height=500&width=400",
      featured: true,
    },
    {
      id: 5,
      type: "image",
      category: "training",
      title: "Goalkeeping Masterclass",
      description: "Courtois demonstrating world-class saves",
      date: "July 12, 2023",
      src: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 6,
      type: "video",
      category: "skills",
      title: "Free Kick Practice",
      description: "Kroos and Modric perfecting their free kicks",
      date: "August 3, 2023",
      src: "/placeholder.svg?height=400&width=600",
      duration: "3:12",
    },
    {
      id: 7,
      type: "image",
      category: "celebration",
      title: "Trophy Celebration at Practice",
      description: "The team celebrating with the La Liga trophy during practice",
      date: "May 28, 2023",
      src: "/placeholder.svg?height=600&width=400",
      featured: true,
    },
    {
      id: 8,
      type: "image",
      category: "team",
      title: "Pre-Season Training Camp",
      description: "The squad during pre-season in Los Angeles",
      date: "July 25, 2023",
      src: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 9,
      type: "video",
      category: "training",
      title: "Tactical Analysis Session",
      description: "Coach explaining tactical approaches",
      date: "September 8, 2023",
      src: "/placeholder.svg?height=400&width=600",
      duration: "4:45",
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "training", label: "Training" },
    { id: "skills", label: "Skills" },
    { id: "team", label: "Team" },
    { id: "celebration", label: "Celebrations" },
  ]

  const filteredMedia = mediaItems.filter((item) => {
    // Filter by category
    const categoryMatch = activeFilter === "all" || item.category === activeFilter

    // Filter by search query
    const searchMatch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return categoryMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c3d] to-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 mt-10">
            <span className="text-[#febe10]">Favourite</span> Moments
          </h1>
          {/* <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of exclusive training sessions, practice moments, and behind-the-scenes footage of
            your favorite Real Madrid stars.
          </p> */}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search gallery..."
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#febe10] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter size={18} className="text-[#febe10] mr-2 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeFilter === category.id
                    ? "bg-[#febe10] text-[#0b1c3d] font-medium"
                    : "bg-white bg-opacity-10 hover:bg-opacity-20"
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          <AnimatePresence>
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-xl ${item.featured ? "sm:col-span-2 row-span-2" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[4/3] w-full h-full">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#febe10] rounded-full p-3 bg-opacity-90">
                        <Play className="h-8 w-8 text-[#0b1c3d]" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                      <span className="text-xs font-medium text-[#febe10] uppercase tracking-wider">
                        {item.category} • {item.date}
                      </span>
                      <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                      <p className="text-sm text-gray-300 mt-1 line-clamp-2">{item.description}</p>

                      {item.type === "video" && (
                        <span className="inline-flex items-center mt-2 text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                          <Play className="h-3 w-3 mr-1" /> {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal for expanded view */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="relative max-w-5xl w-full bg-[#0b1c3d] rounded-xl overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="relative aspect-video w-full">
                  <Image
                    src={selectedItem.src || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />

                  {selectedItem.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#febe10] rounded-full p-4 bg-opacity-90 cursor-pointer hover:bg-opacity-100 transition">
                        <Play className="h-10 w-10 text-[#0b1c3d]" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-sm font-medium text-[#febe10] uppercase tracking-wider">
                    {selectedItem.category} • {selectedItem.date}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">{selectedItem.title}</h2>
                  <p className="text-gray-300 mt-2">{selectedItem.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

