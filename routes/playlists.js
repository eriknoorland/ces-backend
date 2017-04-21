const express = require('express')
const router = express.Router();
const fs = require('fs');
const config = require('./../local.config');

router.get('/', function(request, response) {
  let playlists = [];

  if(fs.existsSync(config.playlistsDir)) {
    fs.readdirSync(config.playlistsDir).forEach(function(file) {
      const baseUrl = `/${request.baseUrl}/`;
      const filename = file.slice(0, -4)
      const fileUrl = baseUrl + file;

      playlists.push({
        src: fileUrl,
        name: filename
      });
    });

    response.json(playlists);
  }
  else {
    response.status(404).send('Playlists not found!');
  }
});

router.get('/:name', function(request, response) {
  try {
    const playlistName = `${request.params.name}.json`;
    const playlist = require(`${config.playlistsDir}${playlistName}`);

    response.json(playlist);
  }
  catch(error) {
    response.status(404).send('Playlist not found!');
  }
});

module.exports = router;
