import React, { useEffect, useState } from 'react';
import Head from 'next/head';
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
      <Head>
        <title>PLAYERS</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <div>name: {playerDetails.name}</div>
        <div>position: {playerDetails.position}</div>
        <Card.Img variant="top" src={playerDetails.imageUrl} alt={playerDetails.name} style={{ height: '300px' }} />
        <Link passHref href="/teams">
          <Button variant="info">Back to Players</Button>
        </Link>
      </Card>
    </>
  );
}
