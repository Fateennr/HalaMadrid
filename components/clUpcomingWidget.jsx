import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RealMadridUpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const apiKey = process.env.API_KEY;
    const teamId = '86'; // docs
    const apiUrl = `https://api.football-data.org/v4/teams/${teamId}/matches?competitions=CL&status=SCHEDULED`;

    axios.get(apiUrl, { headers: { 'X-Auth-Token': apiKey } })
      .then(response => {
        const upcomingMatches = response.data.matches.filter(match => new Date(match.utcDate) > new Date())
          .slice(0, 4); // ONLY NEXTT 4 MATCHES
        setMatches(upcomingMatches);
      })
      .catch(e => {
        setError(e);
        console.error(e);
      });
  }, []);

  return (
    <div>
      <h2>Upcoming Champions League Matches</h2>
      {error && <p>{error}</p>}
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            {match.homeTeam.name} vs. {match.awayTeam.name} on{' '}
            {new Date(match.utcDate).toUTCString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RealMadridUpcomingMatches;
