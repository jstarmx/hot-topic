import React, { PropTypes } from 'react';

const Index = ({ sessions }) => (
  <div className="container">
    <h1 className="display-4">
      Hot Topic!
    </h1>
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
  sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Index;
