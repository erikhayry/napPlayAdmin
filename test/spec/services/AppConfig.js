'use strict';

describe('Service: Appconfig', function () {

  // load the service's module
  beforeEach(module('NapplayadminApp'));

  // instantiate service
  var Appconfig;
  beforeEach(inject(function(_Appconfig_) {
    Appconfig = _Appconfig_;
  }));

  it('should do something', function () {
    expect(!!Appconfig).toBe(true);
  });

});
