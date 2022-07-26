import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { createTeams, updateTeams } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

const initalState = {
  teamname: '',
  image: '',
  private: true,
};
function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initalState);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
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
      updateTeams(formInput)
        .then(() => router.push(`/teams/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeams(payload).then(() => {
        router.push('/teamRoster');
      });
    }
  };
  return (
    <>
      <Head>
        <title>ADD TEAM</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update a' : 'Add a'} Team</h2>
        {/* Name */}
        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="teamname"
            value={formInput.teamname}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        {/* Image */}
        <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="private"
          name="private"
          label="Private?"
          checked={formInput.favorite}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            private: e.target.checked,
          }))}
        />
        <Button type="submit">{obj.firebaseKey ? 'Update a' : 'Add a'} Team</Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    teamname: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initalState,
};

export default TeamForm;
