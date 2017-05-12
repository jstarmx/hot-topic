import React from 'react';
import { render } from 'react-dom';
import { filter } from 'lodash';

import Index from './components/index';
import Socket from './modules/socket';

const admin = document.querySelector('.admin');
const socket = Socket.open();

const create = () => socket.emit('create', id =>
  location.replace(`${id}/dashboard`)
);

socket.on('update', event =>
  render(
    <Index
      create={create}
      sessions={filter(event.data, session => session.title)}
      adminRights
    />,
    admin
  )
);
