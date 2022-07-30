import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
import ViewPlayerCard from '../../components/ViewPlayerCard';
import { viewTeamDetails } from '../../api/mergedData';
import ViewTeamCard from '../../components/ViewTeamCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>TEAMS</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <div><ViewTeamCard key={firebaseKey} teamObj={teamDetails} src={teamDetails.image} onUpdate={() => null} /></div>
      <div className="d-flex flex-wrap">
        {teamDetails.teams?.map((player) => (
          <ViewPlayerCard key={player.firebaseKey} playerObj={player} onUpdate={() => null} />
        ))}
      </div>

    </>
  );
}
