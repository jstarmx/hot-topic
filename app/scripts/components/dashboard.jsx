import React, { PropTypes } from 'react';
import { max } from 'lodash';

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

  scoreClass(scores, score, colorName) {
    const classList = `dashboard__score dashboard__score--${colorName}`;
    const isMax = score === max(scores) && score > 0;

    return isMax ? `${classList} dashboard__score--max` : classList;
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
            {topics.map(({ id, topic, red, amber, green }) => {
              const colors = [red, amber, green];

              return (
                <tr key={id}>
                  <td>{topic}</td>
                  <td className={this.scoreClass(colors, red, 'red')}>{red}</td>
                  <td className={this.scoreClass(colors, amber, 'amber')}>{amber}</td>
                  <td className={this.scoreClass(colors, green, 'green')}>{green}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
});

export default Dashboard;
