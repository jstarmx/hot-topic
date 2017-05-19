import React, { Component, PropTypes } from 'react';

import { formattedDate } from '../helpers/date';
import X from './icons/x';
import Zap from './icons/zap';

class Index extends Component {
  componentDidMount() {
    this.props.fetchSessions();
  }

  render() {
    const { createSession, destroySession, sessions, adminRights } = this.props;
    return (
      <div className="container">
        <h1 className="display-4">
          Hot Topic!
        </h1>
        {adminRights &&
          <button className="btn btn-primary btn-lg btn-block" onClick={createSession}>
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
            {sessions.map(({ id, title, created }) =>
              <tr key={id}>
                <td className="index__row">
                  <button
                    className="dashboard__btn"
                    onClick={() => destroySession(id)}
                  >
                    <X className="dashboard__x" />
                  </button>
                  <span className="index__date">
                    {formattedDate(created)}
                  </span>
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
  }
}

Index.propTypes = {
  adminRights: PropTypes.bool,
  createSession: PropTypes.func,
  destroySession: PropTypes.func,
  fetchSessions: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Index.defaultProps = {
  adminRights: false,
  createSession: () => {},
  destroySession: () => {},
};

export default Index;
