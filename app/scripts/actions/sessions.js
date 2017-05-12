export const CREATE_SESSION = 'CREATE_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';

export const createSession = () => ({
  type: CREATE_SESSION,
});

export const destroySession = id => ({
  type: DESTROY_SESSION,
  payload: id,
});
