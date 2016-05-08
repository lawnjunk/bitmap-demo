'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const Bitmap = require('../model/bitmap');

describe('testing bitmap module', function(){
  describe('testing constructor with data/test.bmp', function(){
    before((done) => {
      fs.readFile(__dirname + '/../data/test.bmp', (err, data) => {
        if (err) throw err;
        this.bitmap = new Bitmap('test.bmp', data);
        done();
      });
    });

    it('name should equal  "test.bmp"', () => {
      expect(this.bitmap.name).to.equal('test.bmp');
    });

    it('size should equal "11078"', () => {
      expect(this.bitmap.size).to.equal(11078);
    });

    it('pixelArrayOffset should equal "1078"', () => {
      expect(this.bitmap.pixelArrayOffset).to.equal(1078);
    });

    it('dib should be an object object ', () => {
      expect(typeof this.bitmap.dib).to.equal('object');
    });

    it('dib.header should equal "40"', ()=> {
      expect(this.bitmap.dib.size).to.equal(40);
    });

    it('dib.width should be equal to "100"', ()=> {
      expect(this.bitmap.dib.width).to.equal(100);
    });

    it('dib.height should be equal to "100"', ()=> {
      expect(this.bitmap.dib.height).to.equal(100);
    });

    it('dib.colorPlanes should be equal to "1"', ()=> {
      expect(this.bitmap.dib.colorPlanes).to.equal(1);
    });

    it('dib.depth should be equal to "8"', ()=> {
      expect(this.bitmap.dib.depth).to.equal(8);
    });

    it('dib.horizontalRes should be equal to "2834"', ()=> {
      expect(this.bitmap.dib.horizontalRes).to.equal(2834);
    });

    it('dib.verticalRes should be equal to "2834"', ()=> {
      expect(this.bitmap.dib.verticalRes).to.equal(2834);
    });

    it('dib.numColors should be equal to "256"', ()=> {
      expect(this.bitmap.dib.numColors).to.equal(256);
    });

    it('colorPallet.length should be equal to (dib.numColors * 4)', ()=> {
      expect(this.bitmap.colorPallet.length).to.equal(this.bitmap.dib.numColors * 4);
    });

    it('pixelArray.length should be equal to (dib.width * dib.height)', ()=> {
      expect(this.bitmap.pixelArray.length).to.equal(this.bitmap.dib.width * this.bitmap.dib.height);
    });

    it('data.length should be equal to size', () => {
      expect(this.bitmap.data.length).to.equal(this.bitmap.size);
    });
  });
});

