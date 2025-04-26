// client/app/components/SquadCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Player {
  _id:         string;
  name:        string;
  position:    string;
  number:      number;
  nationality: string;
  age:         number;
  image?:      string;
}

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SquadCard({ player }: { player: Player }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        flex flex-col overflow-hidden rounded-xl 
        transform transition-all duration-300 
        hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(254,190,16,0.4)]
      "
    >
      {/* ——— Top half: light-at-top gradient + optional photo + dark fade ——— */}
      <div className="relative h-80 bg-gradient-to-b from-white/10 to-white/5">
        {player.image && (
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover object-top"
          />
        )}
        {/* dark-to-transparent overlay to match Hall-of-Fame style */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c3d] to-transparent opacity-60" />
        {/* position badge in bottom center of top half */}
        <div className="absolute bottom-4 w-full text-center">
          <span className="inline-block px-3 py-1 bg-[#febe10] text-[#0b1c3d] text-xs font-bold rounded-full">
            {player.position}
          </span>
        </div>
      </div>

      {/* ——— Bottom half: navy background, fixed padding ——— */}
      <div className="bg-[#0b1120] p-6 text-center flex-1 flex flex-col justify-center">
        <h3 className="text-white text-2xl font-bold leading-snug">
          #{player.number} – {player.name}
        </h3>
        <p className="text-[#febe10] font-medium mt-2">{player.nationality}</p>
        <p className="text-gray-300 text-sm mt-1">{player.age} yrs</p>
      </div>
    </motion.div>
  );
}
