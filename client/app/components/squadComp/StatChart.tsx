"use client"

import { useEffect, useRef } from "react"
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

interface StatChartProps {
  stats: PlayerStats
}

export default function StatChart({ stats }: StatChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Format the stats data for the radar chart
    const data = {
      labels: Object.keys(stats).map((key) => key.replace(/([A-Z])/g, " $1").trim()),
      datasets: [
        {
          label: "Player Stats",
          data: Object.values(stats),
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
                size: 10,
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
  }, [stats])

  return (
    <div className="w-full h-full min-h-[250px] flex items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  )
}
