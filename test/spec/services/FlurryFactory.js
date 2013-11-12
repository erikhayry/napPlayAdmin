'use strict';

describe('Service: FlurryFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var FlurryFactory;
  beforeEach(inject(function (_FlurryFactory_) {
    FlurryFactory = _FlurryFactory_;
  }));

  it('should do something', function () {
    expect(!!FlurryFactory).toBe(true);
  });

});
