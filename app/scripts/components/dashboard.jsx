import React, { PropTypes } from 'react';
import { maxBy } from 'lodash';

const classList = (scores, score) => {
  let classes = `dashboard__score dashboard__score--${score.label}`;

  if (score.score === maxBy(scores, 'score').score && score.score > 0) {
    classes += ' dashboard__score--max';
  }

  return classes;
};

const Dashboard = React.createClass({
  propTypes: {
    add: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  },

  getInitialState() {
    return { newTopic: '' };
  },

  change(e) {
    this.setState({ newTopic: e.target.value });
  },

  submit(e) {
    e.preventDefault();
    this.props.add(this.state.newTopic);
    this.setState({ newTopic: '' });
  },

  render() {
    const { topics } = this.props;

    return (
      <div className="container">
        <h1 className="display-4">Health check</h1>
        <form onSubmit={this.submit}>
          <input
            className="form-control"
            type="text"
            placeholder="Add topic..."
            onChange={this.change}
            value={this.state.newTopic}
          />
        </form>
        <table className="table dashboard__table">
          <thead>
            <tr>
              <th>Topic</th>
              <th><span className="dashboard__light dashboard__light--red" /></th>
              <th><span className="dashboard__light dashboard__light--amber" /></th>
              <th><span className="dashboard__light dashboard__light--green" /></th>
            </tr>
          </thead>
          <tbody>
            {topics.map(({ id, name, scores }) => (
              <tr key={id}>
                <td>{name}</td>
                {scores.map(score => (
                  <td
                    className={classList(scores, score)}
                    key={score.id}
                  >
                    {score.score}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
});

export default Dashboard;
