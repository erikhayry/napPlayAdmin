'use strict';

describe('Service: GraphiteValue', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var GraphiteValue;
  beforeEach(inject(function (_GraphiteValue_) {
    GraphiteValue = _GraphiteValue_;
  }));

  it('should be an object', function () {
    expect(GraphiteValue).toEqual(jasmine.any(Object));
  });

});
