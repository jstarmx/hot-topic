import { ERROR } from '../actions/sessions';

export default (state = '', { type, payload }) => {
  switch (type) {
    case ERROR:
      return payload;

    default:
      return state;
  }
};
