import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import PropTypes from 'prop-types';
import { getSingleTeam } from '../../api/teamData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <div>name: {teamDetails.teamName}</div>
        <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.teamName} style={{ height: '300px' }} />
        <Link passHref href="/teamRoster">
          <Button variant="info">Back to Team</Button>
        </Link>
      </Card>
    </>
  );
}
