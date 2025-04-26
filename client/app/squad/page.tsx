
import SquadList from "@/app/components/squadComp/SquadList";


async function fetchSquad() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/squad`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch squad");
  return res.json();
}

export default async function SquadPage() {
  const squad = await fetchSquad();
  return <SquadList squad={squad} />;
}
