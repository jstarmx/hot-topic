import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import reducers from '../reducers/index';

const socket = io(location.origin.replace(/^http/, 'ws'));
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducers,
  devtools,
  applyMiddleware(thunk, socketIoMiddleware)
);

export default store;
