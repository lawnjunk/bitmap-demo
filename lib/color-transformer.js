'use strict';

// use function currying to make callbacks for built in
// color methods

function createRGBTranform(method, arg){
  return function(color){
    color[method](arg);
    return color;
  };
}

exports.invert = createRGBTranform('invert');
exports.limit = createRGBTranform('limit');
exports.roleover = createRGBTranform('roleover');
exports.blackAndWhite = createRGBTranform('blackAndWhite');

exports.noise = createRGBTranform('noise');
exports.noise10 = createRGBTranform('noise', 0.1);
exports.noise20 = createRGBTranform('noise', 0.2);
exports.noise30 = createRGBTranform('noise', 0.3);
exports.noise40 = createRGBTranform('noise', 0.4);
exports.noise50 = createRGBTranform('noise', 0.5);
exports.noise60 = createRGBTranform('noise', 0.6);
exports.noise70 = createRGBTranform('noise', 0.7);
exports.noise80 = createRGBTranform('noise', 0.8);
exports.noise90 = createRGBTranform('noise', 0.9);

exports.lighten = createRGBTranform('lighten');
exports.lighten10= createRGBTranform('lighten', 10);
exports.lighten20= createRGBTranform('lighten', 20);
exports.lighten30= createRGBTranform('lighten', 30);
exports.lighten40= createRGBTranform('lighten', 40);
exports.lighten50= createRGBTranform('lighten', 50);
exports.lighten60= createRGBTranform('lighten', 60);
exports.lighten70= createRGBTranform('lighten', 70);
exports.lighten80= createRGBTranform('lighten', 80);
exports.lighten90= createRGBTranform('lighten', 90);

exports.darken = createRGBTranform('darken');
exports.darken10= createRGBTranform('darken', 10);
exports.darken20= createRGBTranform('darken', 20);
exports.darken30= createRGBTranform('darken', 30);
exports.darken40= createRGBTranform('darken', 40);
exports.darken50= createRGBTranform('darken', 50);
exports.darken60= createRGBTranform('darken', 60);
exports.darken70= createRGBTranform('darken', 70);
exports.darken80= createRGBTranform('darken', 80);
exports.darken90= createRGBTranform('darken', 90);
