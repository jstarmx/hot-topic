import React from 'react';
import { render } from 'react-dom';

import Dashboard from './components/dashboard';

const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);
const add = name => ws.send(JSON.stringify({ action: 'add', name }));
const dashboard = document.querySelector('.dashboard');

ws.onmessage = event =>
  render(
    <Dashboard add={add} topics={JSON.parse(event.data)} />,
    dashboard
  );
