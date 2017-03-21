import React, { PropTypes } from 'react';
import cookie from 'react-cookie';
import { last } from 'lodash';

import VoteButton from './vote_button';

const Vote = React.createClass({
  propTypes: {
    socket: PropTypes.shape().isRequired,
  },

  getInitialState() {
    return {
      id: null,
      topic: '',
      votedOn: cookie.load('votedOn') || [],
    };
  },

  componentDidMount() {
    this.props.socket.onmessage = (event) => {
      const { id, topic } = last(JSON.parse(event.data));
      this.setState({ id, topic });
    };
  },

  send(score) {
    this.props.socket.send(JSON.stringify({ action: 'vote', score }));
    this.setState({ votedOn: [...this.state.votedOn, this.state.id] });
    cookie.save('votedOn', [...this.state.votedOn, this.state.id], { path: '/' });
  },

  render() {
    return (
      <div className="container">
        <h1 className="display-4">{this.state.topic}</h1>
        {this.state.votedOn.includes(this.state.id) ?
          <img src="check.svg" alt="voted!" className="vote__tick" />
        :
          <div className="scores">
            <VoteButton send={this.send} color="red" />
            <VoteButton send={this.send} color="amber" />
            <VoteButton send={this.send} color="green" />
          </div>
        }
      </div>
    );
  },
});

export default Vote;
