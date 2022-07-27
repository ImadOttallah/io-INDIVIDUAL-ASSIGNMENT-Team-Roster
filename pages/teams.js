import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import Search from '../components/Search';
import { useAuth } from '../utils/context/authContext';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then((playerArray) => {
      setPlayers(playerArray);
      setFilteredPlayers(playerArray);
    });
  };
  useEffect(() => {
    getAllThePlayers();
  }, [user.uid]);
  return (
    <div className="text-center my-4">
      <h1>Players</h1>
      <div><Link passHref href="/players/new">Add Player</Link></div>
      <Search players={players} setFilteredPlayers={setFilteredPlayers} />
      {filteredPlayers.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
      ))}
    </div>
  );
}
