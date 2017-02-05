let mocha = require('mocha');
let describe = mocha.describe;
let it = mocha.it;
let chai = require('chai');
let expect = chai.expect;

let debug = require('debug')('alexa-gym:gym');

let collegegymfans = require('../collegegymfans');

describe('college gym fans', function(){
  it("should load todays streams", function(done){
    collegegymfans.getTodaysStreams()
      .then(grid => {
          expect(grid).to.exist;
          debug(grid);
          done();
        })
        .catch(function(err){
          done(err);
        });
  });
});