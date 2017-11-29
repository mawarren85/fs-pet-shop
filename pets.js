//'use strict';

const shebangCommand = require('shebang-command');

shebangCommand('#!/usr/bin/env node');
shebangCommand('#!/bin/bash');

var fs = require('fs');
var path = require('path');
var petPath = require('./pets.json')
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var petIndex = process.argv[3];
var command = process.argv[2];
var petAge = process.argv[3];
var petKind = process.argv[4];
var petName = process.argv[5];

if (!command) {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

/* ======================== Read ============================*/

if (command === "read") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }

    let newData = JSON.parse(data);

    if (petIndex === undefined) {
      console.log(newData);
    }

    if (numberCheck(petIndex)) {
      console.log(newData[petIndex]);
    }
  });
}

/* ======================== Create ============================*/

if (command === "create") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    let newData = JSON.parse(data);
    let petObject;

    if (!process.argv[3] || !process.argv[4] || !process.argv[5]) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`)
      process.exit(1);
    }

    if (numberCheck(petAge) && stringCheck(petKind) && stringCheck(petName)) {

      petObject = {
        "age": parseInt(petAge),
        "kind": petKind,
        "name": petName
      }
      console.log(petObject);
      newData.push(petObject);
      let petObjectJSON = JSON.stringify(newData);

      fs.writeFile('./pets.json', petObjectJSON, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

/* ======================== Destroy ==========================*/

if (command === "destroy") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }

    if (!process.argv[3]) {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }

    let newData = JSON.parse(data);
    let newArray = [];

    for (let i = 0; i < newData.length; i++) {
      if (i != petIndex) {
        newArray.push(newData[i]);
      }
    }

    let newArrayJSON = JSON.stringify(newArray);
    fs.writeFile('./pets.json', newArrayJSON, function(err) {
      if (err) {
        console.log(err);
      }
      console.log(newData[petIndex]);
    });
  });
}

/* ======================== Update ============================*/

if (command === "update") {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }

    if (!process.argv[3] || !process.argv[4] || !process.argv[5] || !process.argv[6]) {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }

    let newData = JSON.parse(data);
    let petAge = process.argv[4];
    let petKind = process.argv[5];
    let petName = process.argv[6];

    newData[petIndex] = {
      "age": parseInt(petAge),
      "kind": petKind,
      "name": petName
    };

console.log(newData[petIndex]);
    let newDataJSON = JSON.stringify(newData);

    fs.writeFile('./pets.json', newDataJSON, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

/* ======================== Other ============================*/

function numberCheck(n) {
  return !isNaN(n);
}

function stringCheck(n) {
  if (typeof n === "string") {
    return true;
  }
}
