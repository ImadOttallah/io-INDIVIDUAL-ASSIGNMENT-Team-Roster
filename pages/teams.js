import { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import { useAuth } from '../utils/context/authContext';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };
  useEffect(() => {
    getAllThePlayers();
  }, [user]);
  return (
    <div className="text-center my-4">
      {players.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
      ))}
    </div>
  );
}
