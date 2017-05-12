import { filter, last } from 'lodash';

import {
  CREATE_SESSION,
  DESTROY_SESSION,
} from '../actions/sessions';

export default (state = [
  {
    id: 1,
    title: 'lorem',
    topics: [],
  },
], { type, payload }) => {
  switch (type) {
    case CREATE_SESSION:
      return [...state, {
        id: (last(state).id || 0) + 1,
        title: 'qokqsoksokqok lorem',
        topics: [],
      }];

    case DESTROY_SESSION:
      return filter(state, session => session.id !== payload);

    default:
      return state;
  }
};
