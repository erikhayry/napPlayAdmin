'use strict';

describe('Controller: StatspageCtrl', function () {

  // load the controller's module
  beforeEach(module('napPlayAdminApp'));

  var StatspageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatspageCtrl = $controller('StatspageCtrl', {
      $scope: scope
    });
  }));

  it('should set the page name', function () {
    expect(scope.pageName).toBe('Stats Page');
  });
});
