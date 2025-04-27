"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lexend } from "next/font/google";
import MatchCard from "@/app/components/matchComp/MatchCard";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/matches`, {
          cache: "no-store",
        });
        if (!res.ok) {
          console.error("Error fetching matches:", await res.text());
          return;
        }
        const data = await res.json();
        setMatches(data.slice(0, 3)); // Limit to the next 3 matches
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }

    fetchMatches();
  }, []);

  const trophies = [
    { name: "La Liga", count: 35 },
    { name: "UEFA Champions League", count: 14 },
    { name: "Copa del Rey", count: 20 },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.h1
        className="text-3xl font-bold mb-12 text-blue-900"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        "Fear doesn't exist in football, especially for Real Madrid."{" "}
        <i className="text-2xl text-black">- Luka Modric</i>
      </motion.h1>

      {/* Upcoming Matches Section */}
      <motion.section
        className="mb-12 w-full max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-800">
          Upcoming Matches
        </h2>
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No upcoming matches found.</p>
        )}
      </motion.section>

      {/* Trophy Cabinet Section */}
      <motion.section
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-blue-800">Trophy Cabinet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trophies.map((trophy, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover-grow"
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
  );
}

