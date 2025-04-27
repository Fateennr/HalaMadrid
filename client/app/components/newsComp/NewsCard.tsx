"use client";

import Image from "next/image";
import React from "react";
import { NewsItem } from "./NewsHero";

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition p-0 overflow-hidden">
      <div className="relative h-44 w-full">
        <Image
          src={news.imageUrl || "/fallback.jpg"}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">
          {new Date(news.date).toLocaleDateString(undefined, { dateStyle: "medium" })}
        </p>
        <h2 className="text-lg font-semibold mb-2 hover:text-blue-800">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            {news.title}
          </a>
        </h2>
        <p className="text-gray-700 text-sm line-clamp-3">
          {news.summary}
        </p>
      </div>
    </article>
  );
}
