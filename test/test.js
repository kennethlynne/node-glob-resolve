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

//TODO: Fix mock fs injection and remove file fixtures
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
      result = globResolve('test/fixtures/fileA.*');
    });

    it('should return hits', function () {
      expect(result).to.eql([
        'test/fixtures/fileA.js'
      ]);
    });

  });

  describe('when passed an array of globs', function () {

    var result;

    before(function () {
      result = globResolve(['test/fixtures/fileA.*', 'test/fixtures/**/*','test/fixtures/fileA.*']);
    });

    it('should return hits and reject duplicates', function () {
      expect(result).to.eql([
        'test/fixtures/fileA.js',
        'test/fixtures/fileB.js'
      ]);
    });

    describe('when passed negative globs', function () {

      var result;

      before(function () {
        result = globResolve(['test/fixtures/**/*', '!test/fixtures/fileA.*']);
      });

      it('should reject matches', function () {
        expect(result).to.eql([
          'test/fixtures/fileB.js'
        ]);
      });

    });

  });

});