import React from 'react';
import { render } from 'react-dom';
import Socket from 'socket.io-client';

import Dashboard from './components/dashboard';

const dashboard = document.querySelector('.dashboard');
const id = dashboard.getAttribute('data-id');
const HOST = location.origin.replace(/^http/, 'ws');
const socket = Socket(HOST, { query: `id=${id}` });

const add = name => socket.emit('add', name);
const remove = topicId => socket.emit('remove', topicId);
const rename = name => socket.emit('rename', name);
const destroy = (title) => {
  const confirm = window.confirm( // eslint-disable-line no-alert
    `Are you sure you want to delete ${title}? This cannot be undone.`
  );
  if (confirm) {
    socket.emit('destroy', id);
    location.replace('/');
  }
};

socket.on('update', event =>
  render(
    <Dashboard
      add={add}
      destroy={destroy}
      remove={remove}
      rename={rename}
      clients={event.clients}
      title={event.title}
      topics={event.data}
    />,
    dashboard
  )
);
