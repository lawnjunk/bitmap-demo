'use strict';

const BitmapFile = require('./lib/bitmap-file.js');
module.exports = BitmapFile;

const bf = new BitmapFile();
const ct = require('./lib/color-transformers.js');
const rt = require('./lib/row-transformers.js');

const inFilePath = process.argv[2] || __dirname + '/data/foreset.bmp'; 
const outFilePath = process.argv[3] ||  __dirname + '/data/output.bmp';

bf.emit('read', inFilePath);

bf.on('readDone', function(bitmap){
  bitmap.forEachColor(ct.invert)
    .forEachColor(ct.darken, 0.4)
    .forEachColor(ct.noise, 1)
    .forEachPixelRow(rt.mirrorHorizontal)
    .forEachPixelRow(rt.pixelStreach, 10, 300)
    .forEachPixelRow(rt.pixelStreach, 25, 400)
    .forEachPixelRow(rt.pixelStreach, 50, 550)
    .forEachPixelRow(rt.pixelStreach, 10, 500)
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
