import React from 'react';
import { render } from 'react-dom';
// import { filter } from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Index from './containers/index';
import reducers from './reducers/index';
// import Socket from './modules/socket';

const index = document.querySelector('.index');
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const socket = Socket.open();

const store = createStore(
  reducers,
  devtools
);

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  index
);

/*
const create = () => socket.emit('create', id =>
  location.replace(`${id}/dashboard`)
);
*/

/*
socket.on('update', event =>
  render(
    <Index
      create={create}
      sessions={filter(event.data, session => session.title)}
    />,
    index
  )
);
*/
