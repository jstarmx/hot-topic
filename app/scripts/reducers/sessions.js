import { SESSIONS_RECEIVED } from '../actions/sessions';

export default (state = [], { type, payload }) => {
  switch (type) {
    case SESSIONS_RECEIVED:
      return payload.data;

    default:
      return state;
  }
};
