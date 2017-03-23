import React from 'react';
import { render } from 'react-dom';
import Socket from 'socket.io-client';

import Index from './components/index';

const HOST = location.href.replace(/^http/, 'ws');
const socket = Socket(HOST);
const index = document.querySelector('.index');

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
