import PropTypes from 'prop-types';
import React from 'react';

const Error = ({ message }) =>
  <div className="container mt-3 mb-3">
    <div className="alert alert-danger" role="alert">
      <strong>Error:</strong> {message}
    </div>
  </div>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
