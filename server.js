/* eslint-disable no-console */

const express = require('express');
const path = require('path');
const Pool = require('pg').Pool;
const server = require('http').createServer();
const url = require('url');
const WebSocket = require('ws');

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
const wss = new WebSocket.Server({ server });
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, '/public')));

const error = err => console.log('error running query', err);

const fetch = () =>
  pool.query('SELECT * FROM session2')
    .then(res => wss.broadcast(res.rows))
    .catch(err => error(err));

const update = query =>
  pool.query(query)
    .then(() => fetch())
    .catch(err => error(err));

const add = name =>
  update(`INSERT INTO session2(topic, red, amber, green) VALUES ('${name}', 0, 0, 0)`);

const current = () =>
  pool.query('SELECT * FROM session2 ORDER BY id DESC LIMIT 1')
    .catch(err => error(err));

const vote = score =>
  current()
    .then((res) => {
      const latest = res.rows[0].id;
      const query = `UPDATE session2 SET ${score} = ${score} + 1 WHERE id = ${latest}`;
      update(query);
    })
    .catch(err => error(err));

wss.broadcast = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

wss.on('connection', (ws) => {
  fetch();

  ws.on('message', (_data) => {
    const data = JSON.parse(_data);

    switch (data.action) {
      case 'add':
        return add(data.name);
      case 'vote':
        return vote(data.score);
      default:
        return null;
    }
  });
});

server.on('request', app);
server.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
