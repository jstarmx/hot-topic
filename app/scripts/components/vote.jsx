import React, { PropTypes } from 'react';

import VoteButton from './vote_button';

const Vote = ({ name, send }) => (
  <div className="container">
    <h1 className="display-4">{name}</h1>
    <div className="scores">
      <VoteButton send={send} color="red" />
      <VoteButton send={send} color="amber" />
      <VoteButton send={send} color="green" />
    </div>
  </div>
);

Vote.propTypes = {
  name: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
};

export default Vote;
