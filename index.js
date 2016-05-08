'use strict';

const fs = require('fs');

const BitmapFile = require('./lib/bitmap-file.js');
const bf = new BitmapFile();
const ct = require('./lib/color-transformers.js');
const rt = require('./lib/row-transformers.js');

var config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));
const inFilePath = process.argv[2] || `${config.indir}/${config.infile}`;

var outFilePath = process.argv[3] || `${config.outdir}/${config.outname}-${config.count++}.bmp`
fs.writeFileSync(`${__dirname}/config.json`, JSON.stringify(config))

bf.emit('read', inFilePath);

bf.on('readDone', function(bitmap){
  bitmap.forEachColor(ct.invert)
    .forEachColor(ct.darken, 0.4)
    .forEachColor(ct.noise, 1)
    .forEachPixelRow(rt.mirrorHorizontal)
    .forEachPixelRow(rt.pixelStreach, 10, 300)
    .forEachPixelRow(rt.pixelStreach, 25, 400)
    .forEachPixelRow(rt.pixelStreach, 50, 550)
    .forEachPixelRow(rt.pixelStreach, 10, 500);

  console.log('bitmap:', bitmap);
  bf.emit('write', outFilePath, bitmap);
});

bf.on('writeDone', function(filePath){
  console.log('Created Bitmap:', filePath);
});

bf.on('error', function(err){
  console.error('BitmapFile Emitter Error :(');
  throw err;
});
