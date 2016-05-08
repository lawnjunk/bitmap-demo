'use strict';

const Color = require('./color.js');

const Bitmap = module.exports = function(name, buffer){
  this.name = name;
  this.data = buffer;

  // file header
  this.type = buffer.toString('utf8', 0, 2);
  this.size = buffer.readUInt32LE(2);
  this.pixelArrayOffset = buffer.readUInt32LE(10);

  // DIB header
  this.dib = {};
  this.dib.size = buffer.readUInt32LE(14);
  this.dib.width = buffer.readUInt32LE(18);
  this.dib.height = buffer.readUInt32LE(22);
  this.dib.colorPlanes = buffer.readUInt16LE(26);
  this.dib.depth = buffer.readUInt16LE(28);
  this.dib.horizontalRes = buffer.readUInt32LE(38);
  this.dib.verticalRes = buffer.readUInt32LE(42);
  this.dib.numColors = buffer.readUInt32LE(46);
  this.dib.importantColors = buffer.readUInt32LE(50);

  // colorPallet
  this.colorPallet = buffer.slice(54, this.pixelArrayOffset);

  // pixelArray
  this.pixelArray = buffer.slice(this.pixelArrayOffset);
};

Bitmap.prototype.toBuffer = function(){
  return this.buffer;
};

Bitmap.prototype.forEachColor = function(colorTransformer){
  var args = Array.prototype.slice.call(arguments);
  var callback = args[0];
  var callbackArgs = args.slice(1);
  var color, buf;
  var colorArray = this.colorPallet;
  for(var i = 0; i < colorArray.length ; i+=4){
    buf = colorArray.slice(i, i + 4);
    color = new Color(buf);
    callback.apply(null, [color].concat(callbackArgs));
    colorArray.writeUInt32LE(color.toUint32LE(), i);
  }
  return this;
};

// this takes a callback, but is handled by parsing arguments
Bitmap.prototype.forEachPixelRow = function(){
  var args = Array.prototype.slice.call(arguments);
  var callback = args[0];
  var callbackArgs = args.slice(1);
  var row;
  for (var i=0; i < this.pixelArray.length; i += this.dib.width){
    row = this.pixelArray.slice(i, i + this.dib.width);
    callback.apply(null, [row].concat(callbackArgs));
  }
  return this;
};
