/* eslint-disable max-len */
import React, { PropTypes } from 'react';

const X = ({ className }) => (
  <svg className={className} width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
    <title>x</title>
    <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48" />
  </svg>
);

X.defaultProps = {
  className: '',
};

X.propTypes = {
  className: PropTypes.string,
};

export default X;
