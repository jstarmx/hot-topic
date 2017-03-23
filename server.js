/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const path = require('path');
const Pool = require('pg').Pool;
const socket = require('socket.io');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
  };
}

const pool = new Pool(config);
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set('port', (process.env.PORT || 8080));
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

const error = err => console.log('error running query', err);

const getTitle = id =>
  pool.query(`SELECT * FROM sessions WHERE id = ${id}`)
    .then(res => res.rows[0].title);

const fetch = (room, id) => {
  const clients = io.sockets.adapter.rooms[room];
  const payload = {};
  payload.clients = clients ? clients.length : 0;

  pool.query(`SELECT * FROM ${room}`)
    .then((res) => {
      payload.data = res.rows;
      return id ? getTitle(id) : Promise.resolve;
    })
    .then((title) => {
      payload.title = title;
      io.to(room).emit('update', payload);
    })
    .catch(err => error(err));
};

const update = (query, room) =>
  pool.query(query)
    .then(() => fetch(room))
    .catch(err => error(err));

const newSession = id =>
  pool.query(`CREATE TABLE session${id} (id SERIAL, topic TEXT, red INTEGER, amber INTEGER, green INTEGER)`)
    .then(fetch('sessions'))
    .then(() => id);

const getId = () =>
  pool.query('SELECT * FROM sessions ORDER BY id DESC LIMIT 1')
    .then(res => newSession(res.rows[0].id));

const create = () =>
  pool.query("INSERT INTO sessions(title) VALUES ('')")
    .then(getId);

const destroy = id =>
  update(`DELETE FROM sessions WHERE id = ${id}`, 'sessions')
    .then(fetch('sessions'));

const rename = (id, room, name) =>
  update(`UPDATE sessions SET title = '${name}' WHERE id = ${id}`, room)
    .then(fetch('sessions'));

const add = (room, topic) =>
  update(`INSERT INTO ${room}(topic, red, amber, green) VALUES ('${topic}', 0, 0, 0)`, room);

const remove = (room, id) =>
  update(`DELETE FROM ${room} WHERE id = ${id}`, room);

const current = room =>
  pool.query(`SELECT * FROM ${room} ORDER BY id DESC LIMIT 1`)
    .catch(err => error(err));

const vote = (room, score) =>
  current(room)
    .then((res) => {
      const latest = res.rows[0].id;
      const query = `UPDATE ${room} SET ${score} = ${score} + 1 WHERE id = ${latest}`;
      update(query, room);
    })
    .catch(err => error(err));

io.on('connection', (client) => {
  const ID = client.handshake.query.id;
  const ROOM = ID ? `session${ID}` : 'sessions';
  client.join(ROOM);
  fetch(ROOM, ID);

  client.on('create', cb => create().then(id => cb(id)));
  client.on('destroy', id => destroy(id));
  client.on('rename', name => rename(ID, ROOM, name));
  client.on('add', topic => add(ROOM, topic));
  client.on('remove', id => remove(ROOM, id));
  client.on('vote', score => vote(ROOM, score));
});

server.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', (req, res) => res.render('pages/index'));

app.get('/:id/dashboard', (req, res) =>
  res.render('pages/dashboard', { id: req.params.id })
);

app.get('/:id/vote', (req, res) =>
  res.render('pages/vote', { id: req.params.id })
);
