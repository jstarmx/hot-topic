import React from 'react';
import { render } from 'react-dom';

import Vote from './components/vote';

const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);
const vote = document.querySelector('.vote');

render(<Vote socket={ws} />, vote);
