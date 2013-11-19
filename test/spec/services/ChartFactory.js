'use strict';

describe('Service: ChartFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var ChartFactory;
  beforeEach(inject(function(_ChartFactory_) {
    ChartFactory = _ChartFactory_;
  }));

  it('should do something', function () {
    expect(!!ChartFactory).toBe(true);
  });

});
