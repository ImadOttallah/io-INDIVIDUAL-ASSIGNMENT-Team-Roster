import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import { deleteSingleTeam } from '../api/teamData';
import { deleteTeamPlayers } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.teamname}?`)) {
      deleteTeamPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Title>team name: {teamObj.teamname}</Card.Title>
        <Card.Img variant="top" src={teamObj.image} alt={teamObj.teamname} style={{ height: '300px' }} />
        <Card.Body>
          <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
            <Button variant="info">UPDATE</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisTeam} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    teamname: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
