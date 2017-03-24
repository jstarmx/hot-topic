import React from 'react';
import { render } from 'react-dom';
import Socket from 'socket.io-client';

import Error from '../components/error';

const open = (id) => {
  const HOST = location.origin.replace(/^http/, 'ws');
  const config = id ? { query: `id=${id}` } : {};
  const socket = Socket(HOST, config);

  socket.on('error', event =>
    render(<Error message={event} />, document.querySelector('.error'))
  );

  return socket;
};

exports.open = open;
