import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ players, setFilteredPlayers }) {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    const results = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(results);
  };
  return (
    <>
      <input placeholder="Search Players" value={query} onChange={handleChange} />
    </>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};
