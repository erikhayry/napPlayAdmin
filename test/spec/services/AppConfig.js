'use strict';

describe('Service: AppConfig', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var AppConfig;
  beforeEach(inject(function(_AppConfig_) {
    AppConfig = _AppConfig_;
  }));

  it('should be defined', function () {
    expect(!!AppConfig).toBe(true);
  });

});
