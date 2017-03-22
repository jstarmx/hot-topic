import React from 'react';
import { render } from 'react-dom';
import Socket from 'socket.io-client';

import Dashboard from './components/dashboard';

const dashboard = document.querySelector('.dashboard');
const id = dashboard.getAttribute('data-id');
const HOST = location.origin.replace(/^http/, 'ws');
const socket = Socket(HOST, { query: `room=session${id}` });

const add = name => socket.emit('add', name);
const remove = topicId => socket.emit('remove', topicId);

socket.on('update', event =>
  render(
    <Dashboard add={add} remove={remove} topics={event} />,
    dashboard
  )
);
