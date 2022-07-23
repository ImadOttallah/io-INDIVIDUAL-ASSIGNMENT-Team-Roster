/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

export default function User(
  {
    name, email, image, lastLogin,
  },
) {
  return (
    <>
      <div>User</div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Image: <img src={image} alt={name} /></div>
      <div>LastLogin: {lastLogin}</div>
    </>
  );
}

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  lastLogin: PropTypes.string,
};
User.defaultProps = {
  name: 'Imad',
  email: 'imadotta@gmail.com',
  image: 'https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=lA8UuoHt',
  lastLogin: '01/01/2020 15:00:00',
};
