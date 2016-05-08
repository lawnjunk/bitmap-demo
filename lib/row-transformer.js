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
}

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
