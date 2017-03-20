import React from 'react';
import { render } from 'react-dom';

import Dashboard from './components/dashboard';

const host = document.location.host.replace(/:.*/, '');
const ws = new WebSocket(`ws://${host}:8080`);
const add = name => ws.send(JSON.stringify({ action: 'add', name }));
const dashboard = document.querySelector('.dashboard');

ws.onmessage = event =>
  render(
    <Dashboard add={add} topics={JSON.parse(event.data)} />,
    dashboard
  );
