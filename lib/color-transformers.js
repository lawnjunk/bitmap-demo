'use strict';

// use function currying to make callbacks for built in
// color methods

function createColorTranform(method){
  return function(color){
    var args = Array.prototype.slice.call(arguments, 1);
    color[method].apply(color, args);
  };
}

// take no arguments
exports.invert = createColorTranform('invert');
exports.limit = createColorTranform('limit');
exports.roleover = createColorTranform('roleover');
exports.blackAndWhite = createColorTranform('blackAndWhite');

// take scaler arg between 0.0 and 1.0
exports.noise = createColorTranform('noise');
exports.lighten = createColorTranform('lighten');
exports.darken = createColorTranform('darken');
