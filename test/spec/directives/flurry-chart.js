'use strict';
 
describe('Directive: flurry-chart', function() {
  beforeEach(module('napPlayAdminApp'));
 
  var element, scope;
 
  beforeEach(module('templates/chart.html'));
 
  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<flurry-chart flurryFrom="2013-10-01" flurryTo="2013-11-12" flurryMetrics="ActiveUsers, Sessions" flurryType="line"></flurry-chart>');
 
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));
 
  it("should have a title", function() {
    var title = element.find('h2');
    expect(title.text()).toBe('Flurry: ActiveUsers, Sessions');
  });

  it("should have a canvas element", function() {
    var canvasEl = element.find('canvas');
    expect(canvasEl).toBeDefined();
  });


});