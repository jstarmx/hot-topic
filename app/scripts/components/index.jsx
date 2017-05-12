import React, { PropTypes } from 'react';

import Zap from './icons/zap';

const Index = ({ create, sessions, adminRights }) => (
  <div className="container">
    <h1 className="display-4">
      Hot Topic!
    </h1>
    {adminRights &&
      <button className="btn btn-primary btn-lg btn-block" onClick={create}>
        <Zap className="index__zap" /> Start a new session
      </button>
    }
    <table className="table">
      <thead>
        <tr>
          <th>Active sessions</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map(({ id, title }) =>
          <tr key={id}>
            <td className="index__row">
              {title.replace(/%27/g, "'")}
              <div className="index__buttons">
                <a
                  href={`/${id}/vote`}
                  className="btn btn-primary index__btn"
                >
                  Vote
                </a>
                {adminRights &&
                  <a
                    href={`/${id}/dashboard`}
                    className="btn btn-secondary index__btn"
                  >
                    Manage
                  </a>
                }
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

Index.propTypes = {
  adminRights: PropTypes.bool,
  create: PropTypes.func,
  sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Index.defaultProps = {
  adminRights: false,
  create: () => {},
};

export default Index;
