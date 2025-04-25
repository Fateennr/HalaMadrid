"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Trophy, Star, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export default function HallOfFamePage() {
  interface Legend {
    id: number;
    name: string;
    nickname: string;
    years: string;
    position: string;
    image: string;
    achievements: string[];
    bio: string;
    quote: string;
  }
  
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const legendImages = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % legendImages.length)
  }

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + legendImages.length) % legendImages.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c3d] to-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#febe10]">Madridistas</span> Hall of Fame
          </h1>
          <div className="w-24 h-1 bg-[#febe10] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Honoring the legendary figures who have defined the rich history of Real Madrid and left an indelible mark
            on the beautiful game.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {legends.map((legend, index) => (
            <motion.div
              key={legend.id}
              className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(254,190,16,0.3)] hover:-translate-y-2"
              variants={itemVariants}
              onClick={() => setSelectedLegend(legend)}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={legend.image || "/placeholder.svg"}
                  alt={legend.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c3d] to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="inline-block px-3 py-1 bg-[#febe10] text-[#0b1c3d] text-xs font-bold rounded-full mb-2">
                    {legend.position}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-1">{legend.name}</h2>
                <p className="text-[#febe10] font-medium mb-3">{legend.years}</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#febe10]" fill="#febe10" />
                  ))}
                </div>
                <button className="mt-2 px-4 py-2 border border-[#febe10] text-[#febe10] rounded-full text-sm hover:bg-[#febe10] hover:text-[#0b1c3d] transition-colors duration-300">
                  View Tribute
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedLegend && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLegend(null)}
            >
              <motion.div
                className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#0b1c3d] to-[#0a1428] rounded-xl shadow-[0_0_30px_rgba(254,190,16,0.3)]"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-[#febe10] hover:text-[#0b1c3d] transition-colors duration-300"
                  onClick={() => setSelectedLegend(null)}
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-[50vh] lg:h-auto overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0"
                      >
                        <Image
                          src={legendImages[currentImageIndex] || "/placeholder.svg"}
                          alt={`${selectedLegend.name} action shot`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c3d]/70 to-transparent"></div>

                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-[#febe10] hover:text-[#0b1c3d] transition-colors duration-300"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-[#febe10] hover:text-[#0b1c3d] transition-colors duration-300"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0b1c3d] to-transparent">
                      <h2 className="text-4xl font-bold text-white mb-2">{selectedLegend.name}</h2>
                      <p className="text-[#febe10] text-xl font-medium">{selectedLegend.nickname}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-[#febe10]/20 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-[#febe10]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Era at Real Madrid</h3>
                        <p className="text-[#febe10]">{selectedLegend.years}</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Trophy className="h-5 w-5 text-[#febe10] mr-2" />
                        Achievements
                      </h3>
                      <ul className="space-y-2">
                        {selectedLegend.achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                          >
                            <span className="text-[#febe10] mr-2">•</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4">Legacy</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedLegend.bio}</p>
                    </div>

                    <div className="bg-white/5 border-l-4 border-[#febe10] p-4 rounded-r-lg italic">
                      <p className="text-gray-200">"{selectedLegend.quote}"</p>
                      <p className="text-right text-[#febe10] mt-2">— {selectedLegend.name}</p>
                    </div>

                    {/* <div className="mt-8 text-center">
                      <button className="px-6 py-3 bg-[#febe10] text-[#0b1c3d] rounded-full font-bold hover:bg-white transition-colors duration-300">
                        Watch Career Highlights
                      </button>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

