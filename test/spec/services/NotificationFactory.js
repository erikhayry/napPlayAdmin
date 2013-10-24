'use strict';

describe('Service: NotificationFactory', function () {
  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $templateCache) {
    $templateCache.put('views/notifications.html', '.<template-goes-here />');
    
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // backend definition common for all tests
    $httpBackend.expectGET("https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master").respond(['item1', 'item2'])

  }));
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('getNotification should get data', inject(function (NotificationFactory) {
    var data = []
    
    NotificationFactory.getNotification.then(function(data){
      data = data.data;
      expect(data.length).toBe(2);
    });

    $httpBackend.flush();

  }));


});
