import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Imad Ottallah" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SPORT</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>View Team</h1>
        <Link passHref href="/teamRoster"><Button variant="primary"> Teams</Button></Link>
      </div>
    </>
  );
}

export default Home;
