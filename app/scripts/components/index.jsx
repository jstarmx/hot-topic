import React, { PropTypes } from 'react';

import Zap from './icons/zap';

const Index = ({ create, sessions }) => (
  <div className="container">
    <h1 className="display-4">
      Hot Topic!
    </h1>
    <button className="btn btn-primary btn-lg btn-block" onClick={create}>
      <Zap className="index__zap" /> Start a new session
    </button>
    <table className="table">
      <thead>
        <tr>
          <th>Active sessions</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map(({ id, title }) =>
          <tr key={id}>
            <td><a href={`/${id}/vote`}>{title}</a></td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

Index.propTypes = {
  create: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Index;
