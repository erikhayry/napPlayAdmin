'use strict';

describe('Service: NotificationFactory', function () {
  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $templateCache) {
    //needed to prevent Error: Unexpected request: GET views/notifications.html
    $templateCache.put('views/notifications.html', '.<template-goes-here />');
    
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // backend definition common for all tests
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(200, ['item1', 'item2']);



  }));
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  /*
    tests
  */


  it('getNotification should get data', inject(function (NotificationFactory) {
    
    NotificationFactory.getNotification().success(function(data){
      var data = data;
      expect(data.length).toBe(2);
    });

    $httpBackend.flush();

  }));


});
