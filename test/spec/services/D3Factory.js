'use strict';

describe('Service: D3factory', function () {

  // load the service's module
  beforeEach(module('NapplayadminApp'));

  // instantiate service
  var D3factory;
  beforeEach(inject(function(_D3factory_) {
    D3factory = _D3factory_;
  }));

  it('should do something', function () {
    expect(!!D3factory).toBe(true);
  });

});
