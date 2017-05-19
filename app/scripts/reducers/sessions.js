import { filter, last } from 'lodash';

import {
  CREATE_SESSION,
  DESTROY_SESSION,
  SESSIONS_RECEIVED,
} from '../actions/sessions';

export default (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_SESSION:
      return [...state, {
        id: (last(state).id || 0) + 1,
        title: 'untitled session',
        topics: [],
      }];

    case DESTROY_SESSION:
      return filter(state, session => session.id !== payload);

    case SESSIONS_RECEIVED:
      return payload.data;

    default:
      return state;
  }
};
