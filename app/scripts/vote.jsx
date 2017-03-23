import React from 'react';
import { render } from 'react-dom';
import Socket from 'socket.io-client';

import Vote from './components/vote';

const vote = document.querySelector('.vote');
const id = vote.getAttribute('data-id');
const HOST = location.origin.replace(/^http/, 'ws');
const socket = Socket(HOST, { query: `id=${id}` });

render(<Vote socket={socket} room={`session${id}`} />, vote);
