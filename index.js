#!/usr/bin/env node
'use strict';

const BitmapFile = require('./lib/bitmap-file.js');
module.exports = BitmapFile;

const bf = new BitmapFile();
const ct = require('./lib/color-transformer.js');
const rt = require('./lib/row-transformer.js');

const inFilePath = process.argv[2] || __dirname + '/data/test.bmp'; 
const outFilePath = process.argv[3] ||  __dirname + '/data/output.bmp';

bf.emit('read', inFilePath);

bf.on('readDone', function(bitmap){
  var counter = 0;
  bitmap.forEachColor(ct.invert)
    .forEachColor(ct.noise10)
    .forEachColor(ct.darken80)
    .forEachPixelRow(rt.mirrorHorizontal);

  //bitmap.forEachColor(function(color){
    ////color.blackAndWhite().lighten().noise(0.3);
    //color.red = counter;
    //color.green = Math.abs((256 - counter));
    //color.blue = Math.floor((color.red + color.green ) / 2);
    //color.roleover();
    //console.log(color);
    //counter += 1;
  //}).forEachPixelRow(function(rowBuffer){
    //var halfWay = Math.floor(rowBuffer.length /2);
    //var halfRow = rowBuffer.slice(halfWay, rowBuffer.length);
    ////halfRow.reverse();
  //});
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

