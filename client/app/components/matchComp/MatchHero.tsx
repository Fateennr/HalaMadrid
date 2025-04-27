"use client";

import Image from "next/image";
import React from "react";

export interface MatchItem {
  date:         string;
  competition:  string;
  home:         string;
  away:         string;
  homeLogo:     string;
  awayLogo:     string;
  venue:        string;
}

export default function MatchHero({ match }: { match: MatchItem }) {
  return (
    <section className="bg-blue-800 text-white p-8 grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <p className="uppercase text-sm opacity-80">{match.competition}</p>
        <p className="text-lg">{new Date(match.date).toLocaleString()}</p>
        <h1 className="text-3xl font-bold">
          {match.home} vs {match.away}
        </h1>
        <p className="opacity-90">Venue: {match.venue}</p>
      </div>
      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <Image src={match.homeLogo} width={80} height={80} alt={match.home} />
          <p className="mt-2">{match.home}</p>
        </div>
        <span className="text-2xl font-bold">vs</span>
        <div className="text-center">
          <Image src={match.awayLogo} width={80} height={80} alt={match.away} />
          <p className="mt-2">{match.away}</p>
        </div>
      </div>
    </section>
  );
}
