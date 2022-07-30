import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import { deleteSingleTeam } from '../api/teamData';

export default function ViewTeamCard({ teamObj }) {
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Title>team name: {teamObj.teamname}</Card.Title>
        <Card.Img variant="top" src={teamObj.image} alt={teamObj.teamname} style={{ height: '300px' }} />
        <Card.Body>
          <Link passHref href="/players/new"><Button variant="primary">Add Player</Button></Link>
          <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
            <Button variant="info">UPDATE</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

ViewTeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    teamname: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
