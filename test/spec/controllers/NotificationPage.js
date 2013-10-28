'use strict';

describe('Controller: NotificationpageCtrl', function () {

  // load the controller's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend,
      NotificationpageCtrl,
      scope,
      createController;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $templateCache) {
    //needed to prevent Error: Unexpected request: GET views/notifications.html
    $templateCache.put('views/notifications.html', '.<template-goes-here />');

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // backend definition common for all tests
    $httpBackend.when('GET', "https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(201, '');

    scope = $rootScope.$new();
    
    createController = function() { 
      return $controller('NotificationpageCtrl', {$scope: scope});
    };

  }));
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should set the page name', function () {
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(201, '');
    var controller = createController();
    expect(scope.pageName).toBe('Notification Page');
    $httpBackend.flush();
  });

  it('should get data on init', function(){
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(201, '');
    var controller = createController();
    expect(scope.notifications).toBeUndefined();
    $httpBackend.flush();
    expect(scope.notifications).toBeDefined();
  })

  it('should get data on init', function(){
    var controller = createController();
    $httpBackend.flush();
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(201, '');
    scope.getData()
    expect(scope.status).toBe('getting data');
    $httpBackend.flush();
    expect(scope.status).toBe('');
  })

  it('should get get an error status', function(){
    var controller = createController();
    $httpBackend.flush();
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(500, '');
    scope.getData()
    expect(scope.status).toBe('getting data');
    $httpBackend.flush();
    expect(scope.status).toBe('ERROR!');
  })

});
