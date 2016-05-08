'use strict';

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;

const Bitmap = require('../model/bitmap.js');

const BitmapFile = module.exports = function(filePath){
  EventEmitter.call(this);

  this.on('read', (filePath) => {
    const name = path.basename(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) return this.emit('error', err);
      const result = new Bitmap(name, data);
      this.emit('readDone', result);
    });
  });

  this.on('write', (filePath, bitmap) => {
    fs.writeFile(filePath, bitmap.data, (err) => {
      if (err) return this.emit('error', err);
      this.emit('writeDone', filePath);
    });
  });

  if (filePath) this.emit('read', filePath);
};

BitmapFile.prototype = Object.create(EventEmitter.prototype);
