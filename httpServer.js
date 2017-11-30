'use strict';

var http = require('http');
var port = process.env.PORT || 8000;
var fs = require('fs');
var path = require('path');
var petPath = require('./pets.json')

var server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  var statusCode = res.statusCode;

  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    let newData = JSON.parse(data)

    if (req.url === '/pets' && statusCode == 200) {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    }

    if (req.url === '/pets/0' && statusCode == 200) {
      let stringData = JSON.stringify(newData[0])
      res.setHeader('Content-Type', 'application/json');
      res.end(stringData);
    }

    if (req.url === '/pets/1' && statusCode == 200) {
      let stringData = JSON.stringify(newData[1])
      res.setHeader('Content-Type', 'application/json');
      res.end(stringData);
    }

    if (req.url === '/pets/2') {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found')
    }

    if (req.url === '/pets/-1') {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      console.log('notfound')
      res.end('Not Found')
    }

    res.end('done')

  });

});

server.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = server;
