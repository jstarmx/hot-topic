const extend = require('lodash/extend');
const Socket = require('socket.io');

const db = require('./db');

const open = (server) => {
  const io = new Socket(server);

  io.on('connection', (client) => {
    const ID = client.handshake.query.id;
    const ROOM = ID ? `session${ID}` : 'sessions';
    client.join(ROOM);

    const emit = (payload) => {
      if (payload.error) {
        io.to(client.id).emit('error', payload.error);
      } else {
        let clients = io.sockets.adapter.rooms[payload.room];
        clients = clients ? clients.length : 0;
        io.to(payload.room).emit('update', extend(payload, { clients }));
      }

      return Promise.resolve;
    };

    const call = (method, args) =>
      db[method].apply(this, args).then(payload => emit(payload));

    client.on('action', (action) => {
      switch (action.type) {
        case 'server/FETCH_SESSIONS':
          return db.fetch('sessions').then((payload) => {
            io.emit('action', { type: 'SESSIONS_RECEIVED', payload });
          });

        case 'server/CREATE_SESSION':
          return db.create().then(id => action.data(id));

        default:
          return null;
      }
    });

    client.on('create', cb => db.create().then(id => cb(id)));
    client.on('destroy', id => call('destroy', [id]));
    client.on('add', topic => call('add', [ROOM, topic]));
    client.on('remove', id => call('remove', [ROOM, id]));
    client.on('vote', (id, score) => call('vote', [ROOM, id, score]));
    client.on('rename', name => call('rename', [ROOM, ID, name])
      .then(call('fetch', ['sessions'])));

    call('fetch', [ROOM]);
  });
};

exports.open = open;
