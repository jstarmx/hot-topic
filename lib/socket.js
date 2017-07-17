const extend = require('lodash/extend');
const Socket = require('socket.io');

const db = require('./db');

const open = server => {
  const io = new Socket(server);

  io.on('connection', client => {
    const ID = client.handshake.query.id;
    const ROOM = ID ? `session${ID}` : 'sessions';
    client.join(ROOM);

    const error = payload =>
      io.to(client.id).emit('action', { type: 'ERROR', payload });

    const returnSessions = payload => {
      if (payload.error) return error(payload.error);
      return io.emit('action', { type: 'SESSIONS_RECEIVED', payload });
    };

    const returnSession = payload => {
      if (payload.error) return error(payload.error);

      let clients = io.sockets.adapter.rooms[payload.room];
      clients = clients ? clients.length : 0;

      return io.to(payload.room).emit('action', {
        type: 'SESSION_RECEIVED',
        payload: extend(payload, { clients }),
      });
    };

    client.on('action', ({ data, type }) => {
      switch (type) {
        case 'server/FETCH_SESSIONS':
          return db.fetch('sessions').then(returnSessions);

        case 'server/CREATE_SESSION':
          return db.create().then(returnSessions);

        case 'server/DESTROY_SESSION':
          return db.destroy(data).then(returnSessions);

        case 'server/FETCH_SESSION':
          return db.fetch(ROOM).then(returnSession);

        case 'server/RENAME_SESSION':
          return db.rename(data).then(returnSession);

        case 'server/ADD_TOPIC':
          return db.add(data).then(returnSession);

        case 'server/REMOVE_TOPIC':
          return db.remove(data).then(returnSession);

        case 'server/VOTE':
          return db.vote(data).then(returnSession);

        default:
          return null;
      }
    });
  });
};

exports.open = open;
