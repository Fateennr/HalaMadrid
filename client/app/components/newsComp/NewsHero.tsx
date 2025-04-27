"use client";

import Image from "next/image";
import React from "react";

export interface NewsItem {
  title:    string;
  summary:  string;
  imageUrl: string;
  date:     string;
  url:      string;
}

export default function NewsHero({ news }: { news: NewsItem }) {
  return (
    <section className="relative h-[60vh] w-full">
      <Image
        src={news.imageUrl || "/fallback.jpg"}
        alt={news.title}
        fill
        className="object-cover brightness-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
        <p className="text-gray-300 mb-2">
          {new Date(news.date).toLocaleDateString(undefined, { dateStyle: "medium" })}
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            {news.title}
          </a>
        </h1>
        <p className="text-gray-200 max-w-2xl">{news.summary}</p>
      </div>
    </section>
  );
}
