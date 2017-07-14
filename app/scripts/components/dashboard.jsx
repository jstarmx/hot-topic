import React, { Component, PropTypes } from 'react';
import { bindAll } from 'lodash';

import Home from './icons/home';
import Topic from './topic';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTopic: '',
      title: '',
    };
    bindAll(this, 'add', 'remove', 'destroy', 'rename');
  }

  componentDidMount() {
    this.props.fetchSession(this.props.id);
  }

  componentWillReceiveProps({ title }) {
    this.setState({ title });
  }

  change(e, key) {
    this.setState({ [key]: e.target.value });
  }

  rename(e) {
    e.preventDefault();
    const { renameSession, id, room } = this.props;
    const input = e.target.querySelector('input');
    if (input) input.blur();

    renameSession({
      name: this.state.title.replace(/'/g, '%27'),
      id,
      room,
    });
  }

  add(e) {
    e.preventDefault();
    const { addTopic, room } = this.props;
    addTopic({
      room,
      title: this.state.newTopic.replace(/'/g, '%27'),
    });
    this.setState({ newTopic: '' });
  }

  remove(id) {
    const { removeTopic, room } = this.props;
    removeTopic({ id, room });
  }

  destroy() {
    const confirm = window.confirm( // eslint-disable-line no-alert
      `Are you sure you want to delete ${this.state.title}? This cannot be undone.`
    );
    if (confirm) {
      this.props.destroySession(this.props.id);
      location.replace('/admin');
    }
  }

  render() {
    const { clients, topics } = this.props;
    const { title } = this.state;

    return (
      <div>
        <div className="bg-inverse">
          <div className="container">
            <nav className="nav nav-inverse">
              <a className="nav-link nav__link" href="/">
                <Home className="nav__home" />
              </a>
              <a className="nav-link nav__link" href="/admin">
                Admin
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
              value={title.replace(/%27/g, "'")}
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
                <Topic {...props} remove={this.remove} key={props.id} />
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
              onClick={this.destroy}
            >
              Delete this session
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  clients: PropTypes.number.isRequired,
  destroySession: PropTypes.func.isRequired,
  addTopic: PropTypes.func.isRequired,
  removeTopic: PropTypes.func.isRequired,
  renameSession: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchSession: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Dashboard;
