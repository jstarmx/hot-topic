const Socket = require('socket.io');

const db = require('./db');

const open = (server) => {
  const io = new Socket(server);

  io.on('connection', (client) => {
    const ID = client.handshake.query.id;
    const ROOM = ID ? `session${ID}` : 'sessions';
    client.join(ROOM);

    const returnSessions = payload =>
      io.emit('action', { type: 'SESSIONS_RECEIVED', payload });

    const returnSession = payload =>
      io.to(payload.room).emit('action', { type: 'SESSION_RECEIVED', payload });

    client.on('action', ({ data, type }) => {
      console.log(data);
      switch (type) {
        case 'server/FETCH_SESSIONS':
          return db.fetch('sessions').then(returnSessions);

        case 'server/CREATE_SESSION':
          return db.create().then(returnSessions);

        case 'server/DESTROY_SESSION':
          return db.destroy(data).then(returnSessions);

        case 'server/FETCH_SESSION':
          return db.fetch(`session${data}`).then(returnSession);

        case 'server/ADD_TOPIC':
          return db.add(data).then(returnSession);

        case 'server/REMOVE_TOPIC':
          return db.remove(data).then(returnSession);

        default:
          return null;
      }
    });

    // client.on('add', topic => call('add', [ROOM, topic]));
    // client.on('remove', id => call('remove', [ROOM, id]));
    // client.on('vote', (id, score) => call('vote', [ROOM, id, score]));
    // client.on('rename', name => call('rename', [ROOM, ID, name])
    //   .then(call('fetch', ['sessions'])));

    // db.fetch(ROOM).then(emit);
  });
};

exports.open = open;
