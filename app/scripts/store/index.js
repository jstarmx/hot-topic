import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';

import Socket from '../modules/socket';
import reducers from '../reducers/index';

export default id => {
  const socket = Socket(id);
  const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk, socketIoMiddleware)),
  );
};
