import React, { PropTypes } from 'react';
import { last } from 'lodash';

import Check from './icons/check';
import Home from './icons/home';
import VoteButton from './vote_button';

const getVotedOn = () => (JSON.parse(localStorage.getItem('votedOn')) || {});
const setVotedOn = (votedOn) => {
  localStorage.setItem('votedOn', JSON.stringify({ ...getVotedOn(), ...votedOn }));
};

const Vote = React.createClass({
  propTypes: {
    room: PropTypes.string.isRequired,
    socket: PropTypes.shape().isRequired,
  },

  getInitialState() {
    return {
      id: null,
      title: '',
      topic: '',
      votedOn: getVotedOn()[this.props.room] || [],
    };
  },

  componentDidMount() {
    this.props.socket.on('update', this.update);
  },

  componentWillUnmount() {
    this.props.socket.off('update', this.update);
  },

  update({ data, title }) {
    const { id, topic } = last(data) || { id: null, topic: '' };
    this.setState({ id, title, topic });
  },

  send(score) {
    const { room, socket } = this.props;
    const { id, votedOn: previousVotedOn } = this.state;
    const votedOn = [...previousVotedOn, id];

    socket.emit('vote', id, score);
    this.setState({ votedOn });
    setVotedOn({ [room]: votedOn });
  },

  render() {
    const { id, title, topic, votedOn } = this.state;

    return (
      <div>
        <div className="bg-inverse">
          <div className="container">
            <nav className="nav">
              <a className="nav-link nav__link" href="/">
                <Home className="nav__home" />
              </a>
              <span className="nav-link nav__info">
                {title.replace(/%27/g, "'")}
              </span>
            </nav>
          </div>
        </div>
        <div className="container">
          {id ?
            <div>
              <h1 className="display-4">
                {topic.replace(/%27/g, "'")}
              </h1>
              {votedOn.includes(id) ?
                <Check className="vote__tick" />
              :
                <div className="scores">
                  <VoteButton send={this.send} color="red" />
                  <VoteButton send={this.send} color="amber" />
                  <VoteButton send={this.send} color="green" />
                </div>
              }
            </div>
          :
            <p className="mt-5">Waiting for something to vote on...</p>
          }
        </div>
      </div>
    );
  },
});

export default Vote;
