import React from 'react';
import { render } from 'react-dom';

import Index from './components/index';
import Socket from './modules/socket';

const index = document.querySelector('.index');
const socket = Socket.open();

const create = () => socket.emit('create', id =>
  location.replace(`${id}/dashboard`)
);

socket.on('update', event =>
  render(
    <Index
      create={create}
      sessions={event.data}
    />,
    index
  )
);
