'use strict';

describe('Service: FlurryValue', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var FlurryValue;
  beforeEach(inject(function (_FlurryValue_) {
    FlurryValue = _FlurryValue_;
  }));

  it('should do something', function () {
    expect(!!FlurryValue).toBe(true);
  });

});
