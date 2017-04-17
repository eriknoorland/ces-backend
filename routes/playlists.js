const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');

const playlistFolder = './../playlists/';

// var playlists = [
//   {
//     src: "/playlists/ratm.json",
//     name: "Rage Against The Machine"
//   },
//   {
//     src: "/playlists/queen.json",
//     name: "Queen"
//   }
// ];

router.get('/', function(request, response) {
  console.log('fs.existsSync(playlistFolder)', fs.existsSync(playlistFolder));

  if(fs.existsSync(playlistFolder)) {
    console.log('fs.readdirSync(playlistFolder)', fs.readdirSync(playlistFolder));
    fs.readdirSync(playlistFolder).forEach(function(filename) {
      console.log(filename);
    });
  }
});

router.get('/:name', function(request, response) {
  try {
    const playlistName = request.params.name + '.json';
    const playlist = require(`${playlistFolder}${playlistName}`);
    response.json(playlist);
  }
  catch(error) {
    response.status(404).send('Playlist not found!')
  }
});

module.exports = router;
