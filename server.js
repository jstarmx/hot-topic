const express = require('express');
const cloneDeep = require('lodash/cloneDeep');
const find = require('lodash/find');
const last = require('lodash/last');
const path = require('path');
const server = require('http').createServer();
const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const wss = new WebSocket.Server({ server });
const topics = [];
let id = 1;
const scores = [
  { id: 1, label: 'red', score: 0 },
  { id: 2, label: 'amber', score: 0 },
  { id: 3, label: 'green', score: 0 },
];

wss.on('connection', (ws) => {
  wss.broadcast();

  ws.on('message', (_data) => {
    const data = JSON.parse(_data);
    console.log(data);

    if (data.score) {
      const topicScores = last(topics).scores;
      find(topicScores, { label: data.score }).score += 1;
    }

    if (data.name) {
      topics.push({ id, name: data.name, scores: cloneDeep(scores) });
      id += 1;
    }

    wss.broadcast();
  });
});

server.on('request', app);
server.listen(8080, () => console.log('Listening on http://localhost:8080'));

wss.broadcast = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(topics));
    }
  });
};
