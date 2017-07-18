import { h, render } from 'preact';
import Socket from 'socket.io-client';

import Error from '../components/error';

export default id => {
  const HOST = location.origin.replace(/^http/, 'ws');
  const config = id ? { query: `id=${id}` } : {};
  const socket = Socket(HOST, config);

  socket.on('error', event =>
    render(<Error message={event} />, document.querySelector('.error'))
  );

  return socket;
};
