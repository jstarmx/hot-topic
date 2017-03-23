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
const destroy = (id, title) => {
  const confirm = window.confirm( // eslint-disable-line no-alert
    `Are you sure you want to delete '${title}'? This cannot be undone.`
  );
  if (confirm) socket.emit('destroy', id);
};

socket.on('update', event =>
  render(
    <Index
      create={create}
      destroy={destroy}
      sessions={event.data}
    />,
    index
  )
);
