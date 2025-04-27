// app/matches/page.tsx
import MatchHero, { MatchItem } from "@/app/components/matchComp/MatchHero";
import MatchCard                  from "@/app/components/matchComp/MatchCard";

export const dynamic = "force-dynamic";

async function getMatches(): Promise<MatchItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    console.error("Error fetching matches:", await res.text());
    return [];
  }
  return res.json();
}

export default async function MatchesPage() {
  const matches = await getMatches();
  if (matches.length === 0) {
    return (
      <p className="p-8 text-center text-gray-700 dark:text-gray-300">
        No upcoming matches found.
      </p>
    );
  }

  const [nextMatch, ...others] = matches;
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <MatchHero match={nextMatch} />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Other Upcoming Matches</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m, i) => (
            <MatchCard key={i} match={m} />
          ))}
        </div>
      </section>
    </main>
  );
}
