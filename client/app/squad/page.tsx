import SquadList from "@/app/components/squadComp/SquadList";

async function fetchSquad() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/squad`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch squad");
    }

    return res.json();
  } catch (error) {
    console.error("Squad fetch error:", error);
    throw new Error("Unable to load squad data. Please try again later.");
  }
}

export default async function SquadPage() {
  try {
    const squadData = await fetchSquad();
    
    if (!squadData) {
      return <div>No squad data available</div>;
    }

    return <SquadList squad={squadData} />;
  } catch (error) {
    return (
      <div className="text-center p-4">
        <h2 className="text-red-500">Error loading squad data</h2>
        <p>{error.message}</p>
      </div>
    );
  }
}
