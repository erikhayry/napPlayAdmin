'use strict';

describe('Service: RenderValue', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var RenderValue;
  beforeEach(inject(function (_RenderValue_) {
    RenderValue = _RenderValue_;
  }));

  it('should be an object', function () {
    expect(RenderValue).toEqual(jasmine.any(Object));
  });

});
