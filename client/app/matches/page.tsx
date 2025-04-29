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
    <main className="min-h-screen bg-gray-50">
      <MatchHero match={matches[0]} />

      <section className="container mx-auto px-4 py-12 pb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="h-1 w-6 bg-blue-600 rounded-full mr-3"></span>
          Other Upcoming Matches
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {matches.slice(1).map((match, i) => (
            <MatchCard key={i} match={match} index={i} />
          ))}
        </div>
      </section>
    </main>
  )
}
