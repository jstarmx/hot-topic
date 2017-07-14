export const CREATE_SESSION = 'server/CREATE_SESSION';
export const DESTROY_SESSION = 'server/DESTROY_SESSION';
export const FETCH_SESSIONS = 'server/FETCH_SESSIONS';
export const FETCH_SESSION = 'server/FETCH_SESSION';
export const RENAME_SESSION = 'server/RENAME_SESSION';
export const SESSIONS_RECEIVED = 'SESSIONS_RECEIVED';
export const SESSION_RECEIVED = 'SESSION_RECEIVED';
export const ADD_TOPIC = 'server/ADD_TOPIC';
export const REMOVE_TOPIC = 'server/REMOVE_TOPIC';
export const VOTE = 'server/VOTE';
export const ERROR = 'ERROR';

export const createSession = () => dispatch =>
  dispatch({
    type: CREATE_SESSION,
  });

export const destroySession = id => dispatch =>
  dispatch({
    type: DESTROY_SESSION,
    data: id,
  });

export const fetchSessions = () => dispatch =>
  dispatch({
    type: FETCH_SESSIONS,
    data: 'sessions',
  });

export const fetchSession = id => dispatch =>
  dispatch({
    type: FETCH_SESSION,
    data: id,
  });

export const renameSession = data => dispatch =>
  dispatch({
    type: RENAME_SESSION,
    data,
  });

export const addTopic = data => dispatch =>
  dispatch({
    type: ADD_TOPIC,
    data,
  });

export const removeTopic = data => dispatch =>
  dispatch({
    type: REMOVE_TOPIC,
    data,
  });

export const vote = data => dispatch =>
  dispatch({
    type: VOTE,
    data,
  });
