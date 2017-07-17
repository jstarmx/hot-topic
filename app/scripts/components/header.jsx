import PropTypes from 'prop-types';
import React from 'react';

import Home from './icons/home';

const Header = ({ title, clients, error }) =>
  <header>
    <div className="bg-inverse">
      <div className="container">
        <nav className="nav">
          <a className="nav-link nav__link" href="/">
            <Home className="nav__home" />
          </a>
          <a className="nav-link nav__link" href="/admin">
            Admin
          </a>
          {title &&
            <span className="nav-link nav__info">
              {title.replace(/%27/g, "'")}
            </span>}
          {clients !== null &&
            <span className="nav-link nav__info">
              connected clients: {clients - 1}
            </span>}
        </nav>
      </div>
    </div>
    {error &&
      <div className="bg-danger text-white p-2">
        Error: {error}
      </div>}
  </header>;

Header.defaultProps = {
  title: '',
  clients: null,
  error: '',
};

Header.propTypes = {
  title: PropTypes.string,
  clients: PropTypes.number,
  error: PropTypes.string,
};

export default Header;
