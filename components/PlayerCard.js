import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSinglePlayer } from '../api/playerData';
// import Link from 'next/link';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <div>name: {playerObj.name}</div>
        <div>position: {playerObj.position}</div>
        <div>position: {playerObj.imageUrl}</div>
        <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
