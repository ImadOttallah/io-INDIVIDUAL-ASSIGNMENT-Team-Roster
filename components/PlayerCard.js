import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';
import { getSingleTeam } from '../api/teamData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const [teamName, setTeamName] = useState({});
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getSingleTeam(playerObj.teamId).then((response) => {
      setTeamName(response);
    });
  }, []);
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <div>name: {playerObj.name}</div>
        <div>position: {playerObj.position}</div>
        <div><p className="card-text bold"><b>Team:</b> {teamName.teamname}</p></div>
        <Card.Img variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '300px' }} />
        <Card.Body>
          <Link href={`/players/${playerObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/players/edit/${playerObj.firebaseKey}`} passHref>
            <Button variant="info">UPDATE</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    imageUrl: PropTypes.string,
    teamId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
