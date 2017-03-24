const express = require('express');
const extend = require('lodash/extend');
const http = require('http');
const path = require('path');

const socket = require('./lib/socket');

const app = express();
const server = http.createServer(app);

socket.open(server);

app.set('port', (process.env.PORT || 8000));
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

const data = { version: process.env.npm_package_version };

app.get('/', (req, res) => res.render('pages/index', data));
app.get('/:id/dashboard', (req, res) =>
  res.render('pages/dashboard', extend(data, { id: req.params.id }))
);
app.get('/:id/vote', (req, res) =>
  res.render('pages/vote', extend(data, { id: req.params.id }))
);

server.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('⚡️  Hot Topic! is running on port', app.get('port'));
});

