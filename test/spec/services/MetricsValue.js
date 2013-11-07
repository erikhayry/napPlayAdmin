'use strict';

describe('Service: MetricsValue', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var MetricsValue;
  beforeEach(inject(function (_MetricsValue_) {
    MetricsValue = _MetricsValue_;
  }));

  it('should have one or more values', function () {
    expect(Object.getOwnPropertyNames(MetricsValue).length).not.toEqual(0);
  });

});
