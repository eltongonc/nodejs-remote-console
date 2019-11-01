const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const clientPath = path.resolve(__dirname, '../public/js/');

/**
 * Documentation url
 */
router.get('/', (req, res) => {
  res.render('index');
});


/**
 * Client connection url
 */
router.get('/client.js', (req, res) => {
  fs.exists(clientPath, (exists) => {
    // if the file is not found, return 404
    if(!exists) {
      res.statusCode = 404;
      res.end(`File ${clientPath} not found!`);
      return;
    }

    // read file from file system
    fs.readFile(clientPath + '/client.js', function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        res.end(data);
      }
    });
  })
});

module.exports = router;
