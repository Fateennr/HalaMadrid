"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsHero, { NewsItem } from "@/app/components/newsComp/NewsHero";
import NewsCard from "@/app/components/newsComp/NewsCard";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<NewsItem[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/news`)
      .then(res => setNews(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8 text-center">Loading…</p>;
  if (!news.length) return <p className="p-8 text-center">No news available.</p>;

  const [hero, ...others] = news;
  return (
    <main>
      <NewsHero news={hero} />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">More Stories</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item, i) => <NewsCard key={i} news={item} />)}
        </div>
      </section>
    </main>
  );
}
