import React from 'react';
import { render } from 'react-dom';
import Socket from 'socket.io-client';

import Index from './components/index';

const HOST = location.href.replace(/^http/, 'ws');
const socket = Socket(HOST, { query: 'room=sessions' });
const index = document.querySelector('.index');

socket.on('update', event =>
  render(
    <Index sessions={event} />,
    index
  )
);
