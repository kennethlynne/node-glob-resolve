var proxyquire = require('proxyquire').noCallThru();
var expect = require('chai').expect;
var mockFs = require('mock-fs');

var _fs = mockFs.fs({
  'path/to/directoryA': {
    'filenameA.txt': '',
    'filenameB.txt': '',
    'directory': {
      'filenameC.js': ''
    }
  }
});

var globResolve = proxyquire('./../index', {'graceful-fs': _fs, '@global': true});

describe('globResolve', function () {

  before(function () {
    // TODO: Set up
  });

  after(function () {
    // TODO: Clean up
  });

  describe('when passed no parameters', function () {
    var result;

    before(function () {
      result = globResolve();
    });

    it('should return an empty array', function () {
      expect(result).to.eql([]);
    });

  });

  describe('when passed a single glob', function () {
    var result;

    before(function () {
      result = globResolve('path/**/filenameC.*');
    });

    it('should return hits', function () {
      expect(result).to.eql([
        'path/to/directoryA/directory/filenameC.js'
      ]);
    });

  });

});