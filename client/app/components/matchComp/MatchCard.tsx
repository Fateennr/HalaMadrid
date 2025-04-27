// app/components/matchComp/MatchCard.tsx
"use client";

import Image from "next/image";
import React from "react";
import type { MatchItem } from "./MatchHero";

export default function MatchCard({ match }: { match: MatchItem }) {
  // Format both date and time in one go:
  const formattedDateTime = new Date(match.date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="p-4">
        {/* Show “Apr 28, 2025, 2:30 PM” (or your locale’s equivalent) */}
        <p className="text-xs text-gray-500 mb-1">{formattedDateTime}</p>

        <div className="flex items-center justify-between">
          {/* Home team */}
          <div className="flex items-center space-x-2">
            <Image
              src={match.homeLogo}
              alt={match.home}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium">{match.home}</span>
          </div>

          <span className="font-bold">vs</span>

          {/* Away team */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">{match.away}</span>
            <Image
              src={match.awayLogo}
              alt={match.away}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Competition name */}
        <p className="mt-2 text-gray-700">{match.competition}</p>
        {/* Venue */}
        <p className="mt-1 text-gray-500 text-sm">Venue: {match.venue}</p>
      </div>
    </article>
  );
}
