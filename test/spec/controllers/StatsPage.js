'use strict';

describe('Controller: StatsPageCtrl', function () {

  // load the controller's module
  beforeEach(module('napPlayAdminApp'));

  var StatsPageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatsPageCtrl = $controller('StatsPageCtrl', {
      $scope: scope
    });
  }));

  it('should set the page name', function () {
    expect(scope.pageName).toBe('Stats Page');
  });
});
