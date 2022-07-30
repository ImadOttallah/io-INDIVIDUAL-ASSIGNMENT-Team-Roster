import Button from 'react-bootstrap/Button';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';

const initalState = {
  name: '',
  position: '',
  imageUrl: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initalState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push(`/players/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/teams');
      });
    }
  };
  return (
    <>
      <Head>
        <title>Add Player</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update a' : 'Add a'} Player</h2>
        {/* Name */}
        <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        {/* Position */}
        <FloatingLabel controlId="floatingInput2" label="Position" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Player Position"
            name="position"
            value={formInput.position}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="imageUrl" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Upload Image"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="teamId"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select a Team</option>
            {teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
                selected={obj.teamId === team.firebaseKey}
              >
                {team.teamname}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="favorite"
          name="favorite"
          label="Favorite?"
          checked={formInput.favorite}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }))}
        />
        <Button type="submit">{obj.firebaseKey ? 'Update a' : 'Add a'} Player</Button>
      </Form>
    </>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initalState,
};

export default PlayerForm;
