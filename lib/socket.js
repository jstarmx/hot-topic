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
    };

    const call = (method, args) =>
      db[method].apply(this, args).then(payload => emit(payload));

    client.on('create', cb => db.create().then(id => cb(id)));
    client.on('destroy', id => call('destroy', [id]));
    client.on('rename', name => call('rename', [ID, ROOM, name]));
    client.on('add', topic => call('add', [ROOM, topic]));
    client.on('remove', id => call('remove', [ROOM, id]));
    client.on('vote', score => call('vote', [ROOM, score]));

    call('fetch', [ROOM]);
  });
};

exports.open = open;
