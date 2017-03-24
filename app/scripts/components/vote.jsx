import React, { PropTypes } from 'react';
import cookie from 'react-cookie';
import { last } from 'lodash';

import Check from './icons/check';
import Home from './icons/home';
import VoteButton from './vote_button';

if (!cookie.load('votedOn')) cookie.save('votedOn', {}, { path: '/' });

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
      votedOn: cookie.load('votedOn')[this.props.room] || [],
    };
  },

  componentDidMount() {
    this.props.socket.on('update', (event) => {
      this.setState({ title: event.title });

      if (event.data.length) {
        const { id, topic } = last(event.data);
        this.setState({ id, topic });
      } else {
        this.setState({ id: null, topic: '' });
      }
    });
  },

  send(score) {
    this.props.socket.emit('vote', score);
    const votedOn = [...this.state.votedOn, this.state.id];
    this.setState({ votedOn });
    cookie.save('votedOn', {
      ...cookie.load('votedOn'),
      [this.props.room]: votedOn,
    });
  },

  render() {
    return (
      <div>
        <div className="bg-inverse">
          <div className="container">
            <nav className="nav">
              <a className="nav-link nav__link" href="/">
                <Home className="nav__home" />
              </a>
              <span className="nav-link nav__info">
                {this.state.title}
              </span>
            </nav>
          </div>
        </div>
        <div className="container">
          {this.state.id ?
            <div>
              <h1 className="display-4">{this.state.topic}</h1>
              {this.state.votedOn.includes(this.state.id) ?
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
