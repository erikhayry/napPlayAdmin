'use strict';

describe('Controller: NotificationpageCtrl', function () {

  // load the controller's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend,
      NotificationpageCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // backend definition common for all tests
    $httpBackend.when('GET', "https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(['data1', 'data2']);


    scope = $rootScope.$new();
    
    NotificationpageCtrl = $controller('NotificationpageCtrl', {
      $scope: scope
    });

  }));

  it('should attach a list of awesomeThings to the scope', function () {
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master")
    //$httpBackend.flush();
    console.log(scope.notifications)
    var arrLength = scope.test.length;

    expect(arrLength).toBe(3);
  });

});
