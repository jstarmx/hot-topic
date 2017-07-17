import PropTypes from 'prop-types';
import React from 'react';

const Check = ({ className }) =>
  <svg
    className={className}
    width="12"
    height="16"
    viewBox="0 0 12 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>check</title>
    <path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5" fillRule="evenodd" />
  </svg>;

Check.defaultProps = {
  className: '',
};

Check.propTypes = {
  className: PropTypes.string,
};

export default Check;
