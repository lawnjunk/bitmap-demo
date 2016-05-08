'use strict';

exports.reverseRight = function(rowBuffer){
  const half = Math.floor(rowBuffer.length / 2);
  const rightHalf = rowBuffer.slice(half, rowBuffer.length);
  rightHalf.reverse();
};

exports.reverseLeft = function(rowBuffer){
  const half = Math.floor(rowBuffer.length / 2);
  const leftHalf = rowBuffer.slice(0,half);
  leftHalf.reverse();
};

exports.mirrorHorizontal = function(rowBuffer){
  const half = Math.floor(rowBuffer.length / 2);
  
  // create empty buffer for left half 
  // fill with contents of first half of rowBuffer
  // reverse the left half buffer 
  const leftHalf = new Buffer(half);
  rowBuffer.copy(leftHalf, 0, 0, half);
  leftHalf.reverse();

  // get a refernce to the second half of rowBuffer
  const rightHalf = rowBuffer.slice(half, rowBuffer.length);

  // copy the left half on to the refernce to the right half
  leftHalf.copy(rightHalf);
};

exports.pixelStreach = function(rowBuffer, pixelWidth, startOffset, stopOffset){
  pixelWidth = pixelWidth || 10;
  startOffset = startOffset || 0;
 
  // set the stop offset only if its provided and less than the buffers length
  stopOffset = stopOffset < rowBuffer.length ? stopOffset: rowBuffer.length;

  // if the stop offset is less than or equal to the start offset do nothing
  if (stopOffset <= startOffset) return;

  // loop across the row and repeat pixels pixelWidth times over and over
  var current;
  for (var i = startOffset; i < stopOffset; i++){
    if (i % pixelWidth === 0) {
      current = rowBuffer.readUInt8(i);
      continue;
    }
    rowBuffer.writeUInt8(current, i);
  }
};
