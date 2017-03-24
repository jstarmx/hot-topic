import React from 'react';
import { render } from 'react-dom';

import Socket from './modules/socket';
import Vote from './components/vote';

const vote = document.querySelector('.vote');
const id = vote.getAttribute('data-id');
const socket = Socket.open(id);

render(<Vote socket={socket} room={`session${id}`} />, vote);
