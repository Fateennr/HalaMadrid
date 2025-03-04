import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RealMadridLaLigaMatches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.API_KEY; 
    const teamId = '86';
    const apiUrl = `https://api.football-data.org/v4/teams/${teamId}/matches?competitions=PD&status=SCHEDULED`;
    

    axios.get(apiUrl, { headers: { 'X-Auth-Token': apiKey } })
      .then(response => {
        const upcomingMatches = response.data.matches
          .filter(match => new Date(match.utcDate) > new Date()) //future match
          .slice(0, 4);
        setMatches(upcomingMatches);
      })
      .catch(e => {
        setError('Failed to fetch match data.');
        console.error(e);
      });
  }, []);

  return (
    <div>
      <h2>Upcoming Real Madrid La Liga Matches</h2>
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

export default RealMadridLaLigaMatches;
