import React, { PropTypes } from 'react';

import Home from './icons/home';
import Topic from './topic';

const Dashboard = React.createClass({
  propTypes: {
    add: PropTypes.func.isRequired,
    clients: PropTypes.number.isRequired,
    destroy: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    rename: PropTypes.func.isRequired,
    title: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  },

  getDefaultProps() {
    return { title: '' };
  },

  getInitialState() {
    return { newTopic: '', title: this.props.title };
  },

  change(e, key) {
    this.setState({ [key]: e.target.value });
  },

  rename(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input) input.blur();
    this.props.rename(this.state.title.replace(/'/g, '%27'));
  },

  add(e) {
    e.preventDefault();
    this.props.add(this.state.newTopic.replace(/'/g, '%27'));
    this.setState({ newTopic: '' });
  },

  render() {
    const { clients, topics, remove } = this.props;

    return (
      <div>
        <div className="bg-inverse">
          <div className="container">
            <nav className="nav">
              <a className="nav-link nav__link" href="/">
                <Home className="nav__home" />
              </a>
              <span className="nav-link nav__info">
                connected users: {clients - 1}
              </span>
            </nav>
          </div>
        </div>
        <div className="container">
          <form onSubmit={this.rename}>
            <input
              className="display-4 dashboard__heading"
              placeholder="Enter a title..."
              onChange={e => this.change(e, 'title')}
              onBlur={this.rename}
              value={this.state.title.replace(/%27/g, "'")}
            />
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Topic</th>
                <th><span className="dashboard__light dashboard__light--red" /></th>
                <th><span className="dashboard__light dashboard__light--amber" /></th>
                <th><span className="dashboard__light dashboard__light--green" /></th>
              </tr>
            </thead>
            <tbody>
              {topics.map(props =>
                <Topic {...props} remove={remove} key={props.id} />
              )}
            </tbody>
          </table>
          <form onSubmit={this.add} className="bg-faded dashboard__add">
            <input
              className="form-control"
              type="text"
              placeholder="Add topic..."
              onChange={e => this.change(e, 'newTopic')}
              value={this.state.newTopic}
            />
          </form>
          <div className="dashboard__delete">
            <button
              className="btn btn-outline-danger"
              onClick={() => this.props.destroy(this.state.title)}
            >
              Delete this session
            </button>
          </div>
        </div>
      </div>
    );
  },
});

export default Dashboard;
