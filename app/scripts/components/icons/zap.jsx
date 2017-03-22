import React, { PropTypes } from 'react';

const Zap = ({ className }) => (
  <svg className={className} width="10" height="16" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
    <title>Zap</title>
    <path d="M10 7H6l3-7-9 9h4l-3 7" />
  </svg>
);

Zap.defaultProps = {
  className: '',
};

Zap.propTypes = {
  className: PropTypes.string,
};

export default Zap;
