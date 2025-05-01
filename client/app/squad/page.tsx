"use client"

import SquadList from "@/app/components/squadComp/SquadList"

async function fetchSquad() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/squad`, {
      cache: "no-store",
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Failed to fetch squad")
    }

    return res.json()
  } catch (error) {
    console.error("Squad fetch error:", error)
    throw new Error("Unable to load squad data. Please try again later.")
  }
}

export default async function SquadPage() {
  try {
    const squadData = await fetchSquad()

    if (!squadData) {
      return <div>No squad data available</div>
    }

    return (
      <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
        <SquadList squad={squadData} />
      </div>
    )
  } catch (error) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-12">
        <h2 className="text-red-500 text-2xl font-bold mb-4">Error loading squad data</h2>
        <p className="text-gray-700">
          {error instanceof Error ? error.message : "An unknown error occurred in squad list"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#1E4C9A] text-white rounded hover:bg-[#163a75] transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }
}




// import SquadList from "@/app/components/squadComp/SquadList"

// async function fetchSquad() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/squad`, {
//       cache: "no-store",
//     })

//     if (!res.ok) {
//       const errorData = await res.json()
//       throw new Error(errorData.message || "Failed to fetch squad")
//     }

//     return res.json()
//   } catch (error) {
//     console.error("Squad fetch error:", error)
//     throw new Error("Unable to load squad data. Please try again later.")
//   }
// }

// export default async function SquadPage() {
//   try {
//     const squadData = await fetchSquad()

//     if (!squadData) {
//       return <div>No squad data available</div>
//     }

//     return <SquadList squad={squadData} />
//   } catch (error) {
//     return (
//       <div className="text-center p-4">
//         <h2 className="text-red-500">Error loading squad data</h2>
//         <p>{error.message}</p>
//       </div>
//     )
//   }
// }
