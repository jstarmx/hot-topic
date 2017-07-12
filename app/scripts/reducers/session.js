import {
  SESSION_RECEIVED,
} from '../actions/sessions';

const initialState = {
  clients: 1,
  room: '',
  title: '',
  topics: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION_RECEIVED:
      return {
        clients: payload.clients,
        room: payload.room,
        title: payload.title,
        topics: payload.data,
      };

    default:
      return state;
  }
};
