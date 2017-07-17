import { SESSION_RECEIVED } from '../actions/sessions';

const votedOn = ({ room, data: topics }) => {
  const voteHistory = JSON.parse(localStorage.getItem('votedOn')) || {};
  const votesInRoom = voteHistory[room] || [];
  const currentTopic = topics[0] || {};
  return votesInRoom.includes(currentTopic.id);
};

const initialState = {
  clients: 1,
  room: '',
  title: '',
  topics: [],
  votedOn: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION_RECEIVED:
      return {
        clients: payload.clients,
        room: payload.room,
        title: payload.title,
        topics: payload.data,
        votedOn: votedOn(payload),
      };

    default:
      return state;
  }
};
