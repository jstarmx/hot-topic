import React from 'react';
import { render } from 'react-dom';

import Index from './components/index';

const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);
// const newSession = () => ws.send(JSON.stringify({ action: 'new' }));
const index = document.querySelector('.index');

ws.onmessage = event =>
  render(
    <Index sessions={JSON.parse(event.data)} />,
    index
  );
