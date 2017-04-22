const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('./../local.config');

router.get('/:playlist/:id', function(request, response) {
  try {
    const playlistName = `${request.params.playlist}.json`;
    const playlistPath = `${config.playlistsDir}${playlistName}`;
    const playlistFile = fs.readFileSync(playlistPath);
    const playlist = JSON.parse(playlistFile);
    const song = playlist.songs.filter(song => song.id === request.params.id)[0];
    const songPath = `${config.musicDir}${song.location}`;

    response.set({'Content-Type': 'audio/mpeg'});

    try {
      let readStream = fs.createReadStream(songPath);
      readStream.pipe(response);
    }
    catch(error) {
      response.status(404).send('Song not found!');
    }
  }
  catch(error) {
    response.status(404).send('Playlist not found!');
  }
});

module.exports = router;
