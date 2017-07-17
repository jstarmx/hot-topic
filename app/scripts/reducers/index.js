import { combineReducers } from 'redux';

import error from './error';
import session from './session';
import sessions from './sessions';

export default combineReducers({
  error,
  session,
  sessions,
});
