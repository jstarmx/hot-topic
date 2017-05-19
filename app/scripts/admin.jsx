import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import Index from './containers/index';
import reducers from './reducers/index';

const socket = io(location.origin.replace(/^http/, 'ws'));
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const admin = document.querySelector('.admin');
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducers,
  devtools,
  applyMiddleware(thunk, socketIoMiddleware)
);

render(
  <Provider store={store}>
    <Index adminRights />
  </Provider>,
  admin
);
