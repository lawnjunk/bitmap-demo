function randomUInt8(){
  return Math.floor(Math.random() * 256);
}

const RGBColor = module.exports = function(buffer){
  if (Buffer.isBuffer(buffer)){
    if (buffer.length === 4) {
      this.red = buffer.readUInt8(2);
      this.green = buffer.readUInt8(1);
      this.blue = buffer.readUInt8();
      this.alpha = buffer.readUInt8(3);
      return;
    }
  }

  this.red = 0;
  this.green = 0;
  this.blue = 0;
};

RGBColor.prototype.toBuffer = function(){
  const result = new Buffer(4);
  result.writeUInt8(this.red, 2);
  result.writeUInt8(this.green, 1);
  result.writeUInt8(this.blue);
  return result;
};


RGBColor.prototype.toUint32LE = function(){
  return this.toBuffer().readUInt32LE();
};

RGBColor.prototype.roleover = function(){
  this.red %= 256;
  this.green %= 256;
  this.blue %= 256;
  return this;
};

RGBColor.prototype.limit = function(){
  Object.keys(this).forEach((key) => {
    this[key] = this[key] > 255 ? 255 : this[key];
    this[key] = this[key] < 0 ? 0 : this[key];
  });
  return this;
};

RGBColor.prototype.invert = function(){
  this.red += 128;
  this.green += 128;
  this.blue += 128;
  this.roleover();
  return this;
};

RGBColor.prototype.lighten = function(value){
  value = value || 10;
  this.red += value;
  this.green += value;
  this.blue += value;
  this.limit();
  return this;
};

RGBColor.prototype.darken = function(value){
  value = value || 10;
  this.red -= value;
  this.green -= value;
  this.blue -= value;
  this.limit();
  return this;
};

RGBColor.prototype.blackAndWhite = function(){
  var average =  Math.floor((this.red + this.green + this.blue) / 3);
  this.red = average;
  this.green = average;
  this.blue = average;
  this.alpha = average;
  return this;
}

RGBColor.prototype.noise = function(scaler){
  scaler = scaler || 1;
  this.red += Math.floor(randomUInt8() * scaler);
  this.green += Math.floor(randomUInt8() * scaler);
  this.blue += Math.floor(randomUInt8() * scaler);
  this.roleover();
  return this;
};
