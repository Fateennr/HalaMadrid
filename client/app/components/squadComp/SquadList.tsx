// client/app/squad/SquadList.tsx
"use client";

import { motion } from "framer-motion";
import { SquadCard, Player } from "@/app/components/squadComp/SquadCard";

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function SquadList({ squad }: { squad: Player[] }) {
  if (!squad.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1120] text-gray-400">
        <p className="text-xl">No squad data found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#0b1120] py-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center text-white mb-12"
        >
          Real Madrid <span className="text-[#febe10]">Squad</span>
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {squad.map((p) => (
            <SquadCard key={p._id} player={p} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
