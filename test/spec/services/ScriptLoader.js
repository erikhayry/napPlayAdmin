'use strict';

describe('Service: Scriptloader', function () {

  // load the service's module
  beforeEach(module('NapplayadminApp'));

  // instantiate service
  var Scriptloader;
  beforeEach(inject(function(_Scriptloader_) {
    Scriptloader = _Scriptloader_;
  }));

  it('should do something', function () {
    expect(!!Scriptloader).toBe(true);
  });

});
