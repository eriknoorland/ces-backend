var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

// serve static files on index for the connected client
app.use('/', express.static(__dirname + '/static'));

app.use('/playlists', require('./routes/playlists'));
app.use('/songs', require('./routes/songs'));

module.exports = app;

// https://www.terlici.com/2014/08/25/best-practices-express-structure.html
// https://expressjs.com/en/api.html
// get playlists
// get playlist
// get song
