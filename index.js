#!/usr/bin/env node
'use strict';

const BitmapFile = require('./lib/bitmap-file.js');
module.exports = BitmapFile;

const bf = new BitmapFile();

const inFilePath = process.argv[2] || __dirname + '/data/test.bmp'; 
const outFilePath = process.argv[3] ||  __dirname + '/data/output.bmp';

bf.emit('read', inFilePath);

bf.on('readDone', function(bitmap){
  bitmap.forEachColorBuf(function(color){
    color.invert();
  });
  console.log('bitmap:', bitmap);

  bf.emit('write', outFilePath, bitmap);
});

bf.on('writeDone', function(filePath){
  console.log('Created Bitmap:', filePath);
});

bf.on('error', function(err){
  console.error('bf ERROR');
  throw err;
});

