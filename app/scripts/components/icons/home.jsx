/* eslint-disable max-len */
import React, { PropTypes } from 'react';

const Home = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <title>home</title>
    <path d="M16 9l-3-3V2h-2v2L8 1 0 9h2l1 5c0 .55.45 1 1 1h8c.55 0 1-.45 1-1l1-5h2zm-4 5H9v-4H7v4H4L2.81 7.69 8 2.5l5.19 5.19L12 14z" />
  </svg>
);

Home.defaultProps = {
  className: '',
};

Home.propTypes = {
  className: PropTypes.string,
};

export default Home;
