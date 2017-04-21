const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const config = require('./local.config');

app
  .use('/', express.static(config.staticDir))
  .use('/playlists', require('./routes/playlists'))
  .use('/songs', require('./routes/songs'));

module.exports = app;
