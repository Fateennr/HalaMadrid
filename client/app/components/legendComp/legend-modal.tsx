"use client"

import type React from "react"
import { motion } from "framer-motion"
import { X, Trophy, Calendar } from "lucide-react"
import type { Legend } from "@/app/components/legendComp/legend-card"

interface LegendModalProps {
  legend: Legend
  onClose: () => void
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

export function LegendModal({ legend, onClose }: LegendModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 bg-gray-100 rounded-full p-2 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={legend.image}
                alt={`${legend.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/70 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{legend.name}</h2>
              <p className="text-blue-600 text-xl font-medium">{legend.nickname}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Era at Real Madrid</h3>
                <p className="text-blue-600">{legend.years}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Trophy className="h-5 w-5 text-blue-600 mr-2" />
                Achievements
              </h3>
              <ul className="space-y-2">
                {legend.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Legacy</h3>
              <p className="text-gray-700 leading-relaxed">{legend.bio}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg italic">
              <p className="text-gray-700">"{legend.quote}"</p>
              <p className="text-right text-blue-600 mt-2">— {legend.name}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
