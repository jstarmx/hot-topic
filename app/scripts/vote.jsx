import React from 'react';
import { render } from 'react-dom';
import { last } from 'lodash';

import Vote from './components/vote';

const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);
const send = score => ws.send(JSON.stringify({ action: 'vote', score }));
const vote = document.querySelector('.vote');

ws.onmessage = (event) => {
  const lastTopic = last(JSON.parse(event.data));
  const name = lastTopic ? lastTopic.topic : '';

  render(
    <Vote name={name} send={send} />,
    vote
  );
};
