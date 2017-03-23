import React, { PropTypes } from 'react';

import X from './icons/x';
import Zap from './icons/zap';

const Index = ({ create, destroy, sessions }) => (
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
            <td>
              <button
                className="dashboard__btn"
                onClick={() => destroy(id, title)}
              >
                <X className="dashboard__x" />
              </button>
              <a href={`/${id}/vote`}>{title || '[untitled session]'}</a>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

Index.propTypes = {
  create: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Index;
