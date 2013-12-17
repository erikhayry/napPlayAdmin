'use strict';

describe('Service: ScriptLoader', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var ScriptLoader;
  beforeEach(inject(function(_ScriptLoader_) {
    ScriptLoader = _ScriptLoader_;
  }));

  it('should do something', function () {
    expect(!!ScriptLoader).toBe(true);
  });

});
