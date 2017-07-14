import PropTypes from 'prop-types';
import React from 'react';

const VoteButton = ({ send, color }) => (
  <button
    className={`scores__score scores__score--${color}`}
    onClick={() => send(color)}
  />
);

VoteButton.propTypes = {
  color: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
};

export default VoteButton;
