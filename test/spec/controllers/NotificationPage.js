'use strict';

describe('Controller: NotificationpageCtrl', function () {

  // load the controller's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend,
      NotificationpageCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $templateCache) {
    //needed to prevent Error: Unexpected request: GET views/notifications.html
    $templateCache.put('views/notifications.html', '.<template-goes-here />');

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // backend definition common for all tests
    $httpBackend.expect('GET', "https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(['data1', 'data2']);

    scope = $rootScope.$new();
    
    NotificationpageCtrl = $controller('NotificationpageCtrl', {
      $scope: scope
    });

  }));
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.status).toBeDefined();

    $httpBackend.flush();
  });

});
