import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import PropTypes from 'prop-types';
import { getSinglePlayer } from '../../api/playerData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <div>name: {playerDetails.name}</div>
        <div>position: {playerDetails.position}</div>
        <div>imageUrl: {playerDetails.imageUrl}</div>
        <Link passHref href="/teams">
          <Button variant="info">Back to Team</Button>
        </Link>
      </Card>
    </>
  );
}
