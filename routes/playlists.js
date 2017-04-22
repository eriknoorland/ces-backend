const express = require('express')
const router = express.Router();
const fs = require('fs');
const config = require('./../local.config');

router.get('/', function(request, response) {
  if(fs.existsSync(config.playlistsDir)) {
    let files = fs.readdirSync(config.playlistsDir);
    let playlists = [];

    files.forEach(function(file) {
      const baseUrl = `${request.baseUrl}/`;
      const fileName = file.slice(0, -5)
      const fileUrl = baseUrl + fileName;

      playlists.push({
        src: fileUrl,
        name: fileName
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
    const fileName = `${request.params.name}.json`;
    const filePath = `${config.playlistsDir}${fileName}`;
    const file = fs.readFileSync(filePath);
    const playlist = JSON.parse(file);

    response.json(playlist);
  }
  catch(error) {
    response.status(404).send('Playlist not found!');
  }
});

module.exports = router;
