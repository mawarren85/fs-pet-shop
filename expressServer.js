'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');
var path = require('path');
var petPath = require('./pets.json')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {

    if (err) {
      console.log(err);
    }

    let pets = JSON.parse(data);
    res.send(pets);
  })
})

app.get('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {

    if (err) {
      console.log(err);
    }

    //res.set('Content-Type', 'application/json');

    var id = req.params.id;

    var pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});

app.post('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {

    if (err) {
      console.log(err);
    }
    res.set('Content-Type', 'application/json');
    //console.log (req.body.name, 'name param')
    var pets = JSON.parse(data);
    var petName = req.body.name;
    var petAge = req.body.age;
    var petKind = req.body.kind;
    var newPet = {
      "age": petAge,
      "kind": petKind,
      "name": petName
    };


    if (!petName || !petAge || !petKind || Number.isNaN(petAge)) {
      res.set('Content-Type', 'text/plain');
      res.sendStatus(400);
    } else {
      pets.push(newPet);
      res.set('Content-Type', 'application/json');
      res.send(newPet);
    }
    let newPetString = JSON.stringify(pets)

    fs.writeFile('./pets.json', newPetString, function(err, data) {
      if (err) {
        console.log(err);
      }
    });

    res.end();
  });
});

app.use(function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.sendStatus(404);
});



app.listen(port, function() {
  console.log('Listening on port', port);
});


module.exports = app;
