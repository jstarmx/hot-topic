import React from 'react';
import { render } from 'react-dom';
import { last } from 'lodash';

import Vote from './components/vote';

const host = document.location.host.replace(/:.*/, '');
const ws = new WebSocket(`ws://${host}:8080`);
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
