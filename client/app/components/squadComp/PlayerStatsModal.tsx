"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js"

// Register the required Chart.js components
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

interface PlayerStats {
  passing: number
  vision: number
  ballControl: number
  longShots: number
  creativity: number
  workRate: number
}

interface Player {
  _id: string
  name: string
  position: string
  role: string
  number: number
  nationality: string
  age: number
  imageLink: string
  appearances: number
  overall: number
  stats: PlayerStats
}

interface PlayerStatsModalProps {
  player: Player | null
  isOpen: boolean
  onClose: () => void
}

export default function PlayerStatsModal({ player, isOpen, onClose }: PlayerStatsModalProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  // Function to determine color based on stat value (FIFA style)
  const getStatColor = (value: number) => {
    if (value >= 90) return "#00AC69" // Green
    if (value >= 80) return "#7AE582" // Light Green
    if (value >= 70) return "#FFD166" // Yellow
    if (value >= 60) return "#F76A6A" // Orange-Red
    return "#EF476F" // Red
  }

  // Function to determine overall rating color
  const getOverallColor = (value: number) => {
    if (value >= 90) return "#00AC69"
    if (value >= 80) return "#7AE582"
    if (value >= 70) return "#FFD166"
    if (value >= 60) return "#F76A6A"
    return "#EF476F"
  }

  useEffect(() => {
    if (!isOpen || !player || !chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Format the stats data for the radar chart
    const data = {
      labels: Object.keys(player.stats).map((key) => key.replace(/([A-Z])/g, " $1").trim()),
      datasets: [
        {
          label: "Player Stats",
          data: Object.values(player.stats),
          backgroundColor: "rgba(30, 76, 154, 0.2)",
          borderColor: "rgba(30, 76, 154, 0.8)",
          borderWidth: 2,
          pointBackgroundColor: "#FEDF00",
          pointBorderColor: "#1E4C9A",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#1E4C9A",
          pointRadius: 4,
          pointHoverRadius: 5,
        },
      ],
    }

    // Create the radar chart
    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            angleLines: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            pointLabels: {
              font: {
                size: 12,
              },
              color: "#666",
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              backdropColor: "transparent",
              color: "#999",
              font: {
                size: 8,
              },
            },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleFont: {
              size: 12,
            },
            bodyFont: {
              size: 12,
            },
            padding: 10,
            displayColors: false,
          },
        },
        animation: {
          duration: 1000,
        },
      },
    })

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [isOpen, player])

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && player && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
          style={{ backdropFilter: "blur(3px)" }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100"
              style={{ transition: "all 0.2s ease" }}
            >
              <X size={20} />
            </button>

            {/* Player header */}
            <div
              className="p-6 flex items-center"
              style={{
                background: "linear-gradient(to right, #1E4C9A, #2A5CAA)",
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            >
              <div className="relative w-24 h-24 mr-6">
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, #FEDF00, #1E4C9A)",
                    padding: "2px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "9999px",
                      overflow: "hidden",
                      backgroundColor: "white",
                    }}
                  >
                    <Image
                      src={player.imageLink || "/placeholder.svg?height=96&width=96"}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-white opacity-90 mr-2">{player.position}</span>
                  <span className="bg-white text-[#1E4C9A] text-xs font-bold px-2 py-1 rounded">
                    {player.nationality}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: getOverallColor(player.overall),
                    }}
                  >
                    {player.overall}
                  </div>
                  <span className="text-white opacity-80 ml-2">Overall Rating</span>
                </div>
              </div>
            </div>

            {/* Player stats */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column - Player info and stats bars */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Player Information</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{player.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Number</p>
                      <p className="font-medium">#{player.number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{player.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Appearances</p>
                      <p className="font-medium">{player.appearances}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Attributes</h3>
                  <div className="space-y-4">
                    {Object.entries(player.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          <span className="font-semibold" style={{ color: getStatColor(value) }}>
                            {value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="h-2.5 rounded-full"
                            style={{ backgroundColor: getStatColor(value) }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right column - Radar chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Stats Overview</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-[300px]">
                    <canvas ref={chartRef} />
                  </div>

                  {/* Overall Rating Display */}
                  <div className="mt-6 flex items-center justify-center">
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        backgroundColor: "#f9fafb",
                        border: `4px solid ${getOverallColor(player.overall)}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="text-4xl font-bold" style={{ color: getOverallColor(player.overall) }}>
                        {player.overall}
                      </div>
                      <div className="text-xs uppercase font-semibold mt-1 text-gray-500">Overall</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
