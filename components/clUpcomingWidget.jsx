import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RealMadridCLMatches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const teamId = '86';
        const apiUrl = `http://api.football-data.org/v4/teams/${teamId}/matches?competitions=CL&status=SCHEDULED`;

        const response = await axios.get(apiUrl, {
          headers: { 'X-Auth-Token': apiKey }
            , withCredentials: true
        });

        const upcomingMatches = response.data.matches
          .filter(match => new Date(match.utcDate) > new Date())
          .slice(0, 4);
        
        setMatches(upcomingMatches);
      } catch (err) {
        setError(err.message || 'Failed to fetch match data');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">
        Upcoming Champions League Matches
      </h2>
      <div className="grid gap-4">
        {matches.map(match => (
          <div key={match.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="font-medium">{match.homeTeam.name}</span>
              <span className="text-gray-500">vs</span>
              <span className="font-medium">{match.awayTeam.name}</span>
            </div>
            <p className="text-gray-600 text-sm text-center mt-2">
              {new Date(match.utcDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RealMadridCLMatches;
