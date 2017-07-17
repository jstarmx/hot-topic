import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindAll } from 'lodash';

import Check from './icons/check';
import VoteButton from './vote_button';
import Header from '../containers/header';

const getVotedOn = () => JSON.parse(localStorage.getItem('votedOn')) || {};
const setVotedOn = votedOn => {
  localStorage.setItem(
    'votedOn',
    JSON.stringify({ ...getVotedOn(), ...votedOn }),
  );
};

class Vote extends Component {
  constructor() {
    super();
    this.state = { votedOn: [] };
    bindAll(this, 'send');
  }

  componentDidMount() {
    this.props.fetchSession(this.props.id);
  }

  currentTopic() {
    return this.props.topics[0] || { id: null, topic: '' };
  }

  send(score) {
    const { room, vote } = this.props;
    const { id } = this.currentTopic();
    const { votedOn: previousVotedOn } = this.state;
    const votedOn = [...previousVotedOn, id];

    vote({ room, id, score });
    this.setState({ votedOn });
    setVotedOn({ [room]: votedOn });
  }

  render() {
    const { title, votedOn } = this.props;
    const { id, topic } = this.currentTopic();

    return (
      <div>
        <Header title={title} />
        <div className="container">
          {id
            ? <div>
                <h1 className="display-4">
                  {topic.replace(/%27/g, "'")}
                </h1>
                {votedOn
                  ? <Check className="vote__tick" />
                  : <div className="scores">
                      <VoteButton send={this.send} color="red" />
                      <VoteButton send={this.send} color="amber" />
                      <VoteButton send={this.send} color="green" />
                    </div>}
              </div>
            : <p className="mt-5">Waiting for something to vote on...</p>}
        </div>
      </div>
    );
  }
}

Vote.propTypes = {
  fetchSession: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  vote: PropTypes.func.isRequired,
  votedOn: PropTypes.bool.isRequired,
};

export default Vote;
