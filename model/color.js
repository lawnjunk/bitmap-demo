function randomUInt8(){
  return Math.floor(Math.random() * 256);
}

const Color = module.exports = function(buffer){
  if (Buffer.isBuffer(buffer)){
    if (buffer.length === 4) {
      this.red = buffer.readUInt8(2);
      this.green = buffer.readUInt8(1);
      this.blue = buffer.readUInt8();
      return;
    }
  }

  this.red = 0;
  this.green = 0;
  this.blue = 0;
};

Color.prototype.toBuffer = function(){
  const result = new Buffer(4);
  result.writeUInt8(this.red, 2);
  result.writeUInt8(this.green, 1);
  result.writeUInt8(this.blue);
  return result;
};


Color.prototype.toUint32LE = function(){
  return this.toBuffer().readUInt32LE();
};

Color.prototype.roleover = function(){
  this.red %= 256;
  this.green %= 256;
  this.blue %= 256;
  return this;
};

Color.prototype.limit = function(){
  Object.keys(this).forEach((key) => {
    this[key] = this[key] > 255 ? 255 : this[key];
    this[key] = this[key] < 0 ? 0 : this[key];
  });
  return this;
};

Color.prototype.invert = function(){
  this.red += 128;
  this.green += 128;
  this.blue += 128;
  this.roleover();
  return this;
};

Color.prototype.lighten = function(scaler){
  scaler = Math.floor(255 * scaler);
  scaler = scaler || 10;
  this.red += scaler;
  this.green += scaler;
  this.blue += scaler;
  this.limit();
  return this;
};

Color.prototype.darken = function(scaler){
  scaler = Math.floor(255 * scaler);
  scaler = scaler || 10;
  this.red -= scaler;
  this.green -= scaler;
  this.blue -= scaler;
  this.limit();
  return this;
};

Color.prototype.blackAndWhite = function(){
  var average =  Math.floor((this.red + this.green + this.blue) / 3);
  this.red = average;
  this.green = average;
  this.blue = average;
  this.alpha = average;
  return this;
}

Color.prototype.noise = function(scaler){
  scaler = scaler || 1;
  this.red += Math.floor(randomUInt8() * scaler);
  this.green += Math.floor(randomUInt8() * scaler);
  this.blue += Math.floor(randomUInt8() * scaler);
  this.roleover();
  return this;
};
