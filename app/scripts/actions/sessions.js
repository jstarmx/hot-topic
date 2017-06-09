export const CREATE_SESSION = 'server/CREATE_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';
export const FETCH_SESSIONS = 'server/FETCH_SESSIONS';
export const SESSIONS_RECEIVED = 'SESSIONS_RECEIVED';

const redirect = id => location.replace(`${id}/dashboard`);

export const createSession = () => dispatch =>
  dispatch({
    type: CREATE_SESSION,
    data: redirect,
  });

export const destroySession = id => ({
  type: DESTROY_SESSION,
  payload: id,
});

export const fetchSessions = () => dispatch =>
  dispatch({
    type: FETCH_SESSIONS,
    data: 'sessions',
  });
