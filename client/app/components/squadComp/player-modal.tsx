// app/components/PlayerModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Flag,
  Calendar,
  Hash,
  Award,
  TrendingUp,
} from "lucide-react";
import type { Player } from "@/app/components/squadComp/player-card";

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
}

interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  yellowCards: number;
  redCards: number;
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
};

const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5 },
  }),
};

export function PlayerModal({ player, onClose }: PlayerModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playerImages = [
    player?.imageLink || "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ];

  // fetch real stats when modal opens
  useEffect(() => {
    if (!player) return;
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/players/stats?name=${encodeURIComponent(
        player.name
      )}`
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json() as Promise<PlayerStats>;
      })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch((e) => {
        console.error("Failed to load stats:", e);
        setError("Could not load stats");
      })
      .finally(() => setLoading(false));
  }, [player]);

  if (!player) return null;

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((i) => (i + 1) % playerImages.length);
  };
  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((i) =>
      (i - 1 + playerImages.length) % playerImages.length
    );
  };

  return (
    <AnimatePresence>
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
            {/* IMAGE CAROUSEL */}
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
                    src={playerImages[currentImageIndex]}
                    alt={`${player.name} action shot`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/70 to-transparent" />
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 text-blue-800 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 text-blue-800 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-600 text-white text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center">
                    {player.number}
                  </span>
                  <h2 className="text-4xl font-bold text-gray-800">
                    {player.name}
                  </h2>
                </div>
                <p className="text-blue-600 text-xl font-medium mt-2">
                  {player.position}
                </p>
              </div>
            </div>

            {/* INFO & STATS */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Player Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h4>
                    <p className="text-gray-800 font-medium">
                      {player.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Hash className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Jersey Number
                    </h4>
                    <p className="text-gray-800 font-medium">
                      #{player.number}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Flag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Nationality
                    </h4>
                    <p className="text-gray-800 font-medium">
                      {player.nationality}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Age
                    </h4>
                    <p className="text-gray-800 font-medium">
                      {player.age} years
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  Season Statistics
                </h3>

                {loading && <p>Loading stats…</p>}
                {error && <p className="text-red-500">{error}</p>}

                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      ["Appearances", stats.appearances],
                      ["Goals", stats.goals],
                      ["Assists", stats.assists],
                      ["Clean Sheets", stats.cleanSheets],
                      ["Yellow Cards", stats.yellowCards],
                      ["Red Cards", stats.redCards],
                    ].map(([label, value], i) => (
                      <motion.div
                        key={label}
                        custom={i}
                        variants={statVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-gray-50 p-4 rounded-lg text-center"
                      >
                        <p className="text-gray-500 text-sm mb-1">
                          {label}
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                          {value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="h-5 w-5 text-blue-600 mr-2" />
                  Achievements
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {player.name} has been a key contributor to Real Madrid's
                    success in domestic and European competition.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors duration-300">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
