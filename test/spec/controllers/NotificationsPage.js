'use strict';

describe('Controller: NotificationsPageCtrl', function () {

  // load the controller's module
  beforeEach(module('napPlayAdminApp'));

  var NotificationsPageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotificationsPageCtrl = $controller('NotificationsPageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
