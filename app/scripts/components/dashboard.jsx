import React, { Component, PropTypes } from 'react';
import { bindAll } from 'lodash';

import Home from './icons/home';
import Topic from './topic';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTopic: '',
      title: props.title,
    };
    bindAll(this, 'add', 'remove');
  }

  componentDidMount() {
    this.props.fetchSession(this.props.id);
  }

  change(e, key) {
    this.setState({ [key]: e.target.value });
  }

  // rename(e) {
  //   e.preventDefault();
  //   const input = e.target.querySelector('input');
  //   if (input) input.blur();
  //   this.props.rename(this.state.title.replace(/'/g, '%27'));
  // },

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

  render() {
    const { clients, topics, destroy, title } = this.props;

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
              onClick={() => destroy(this.state.title)}
            >
              Delete this session
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  clients: 1,
  destroy: () => {},
};

Dashboard.propTypes = {
  clients: PropTypes.number,
  destroy: PropTypes.func,
  addTopic: PropTypes.func.isRequired,
  removeTopic: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchSession: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Dashboard;
