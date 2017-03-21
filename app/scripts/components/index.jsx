import React, { PropTypes } from 'react';

const Index = ({ sessions }) => (
  <div className="container">
    <h1 className="display-4">Hot Topic!</h1>
    <table className="table">
      <thead>
        <tr>
          <th>Active sessions</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map(({ id, title }) =>
          <td><a href={`/${id}`}>{title}</a></td>
        )}
      </tbody>
    </table>
  </div>
);

Index.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Index;
