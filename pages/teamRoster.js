import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };
  useEffect(() => {
    getAllTheTeams();
  }, [user]);
  return (
    <div className="text-center my-4">
      {teams.map((team) => (
        <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
      ))}
    </div>
  );
}
