'use strict';

describe('Service: FlurryFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend,
      FlurryFactory,
      $timeout,
      flurryApiUrl_ActiveUsers = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
      flurryApiUrl_Sessions = 'http://api.flurry.com/appMetrics/Sessions?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
      flurryData = {"data": {"@endDate": "2013-11-12", "@metric": "ActiveUsersByDay", "@startDate": "2013-10-01", "@generatedDate": "11/19/13 3:45 AM", "@version": "1.0", "day": [ { "@date": "2013-10-01", "@value": "159" }, { "@date": "2013-10-02", "@value": "189" }, { "@date": "2013-10-03", "@value": "207" }, { "@date": "2013-10-04", "@value": "182" }, { "@date": "2013-10-05", "@value": "127" }, { "@date": "2013-10-06", "@value": "170" }, { "@date": "2013-10-07", "@value": "166" }, { "@date": "2013-10-08", "@value": "142" }, { "@date": "2013-10-09", "@value": "134" }, { "@date": "2013-10-10", "@value": "138" }, { "@date": "2013-10-11", "@value": "131" }]}};

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_FlurryFactory_, $injector, _$timeout_) {
    FlurryFactory = _FlurryFactory_;
    $timeout = _$timeout_;
    $httpBackend = $injector.get('$httpBackend');
  }));
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("getGraphData", function() {
      var flag, data;
      
      beforeEach(inject(function ($injector) {      
        // backend definition common for all tests
        $httpBackend.expectGET(flurryApiUrl_ActiveUsers).respond(200, flurryData);
        $httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData);
      }));

      it("should call the a correct formatted Flurry api url", function() {
        runs(function() {
          flag = false;

          FlurryFactory.getGraphData({
                from : '2013-10-01',
                to : '2013-11-12',
                metrics : ['ActiveUsers', 'Sessions']
          }).then(function(newData){
              data = newData;           
          });
          $timeout.flush();
          $httpBackend.flush();
          flag = true;
        });

        waitsFor(function() {
          return flag;
        }, "The Flurry data should have been returned", 100);

        runs(function() {
          expect(data).toEqual(jasmine.any(Object));
        });
      });
  });


  describe('getInChartFormat', function () {
    it('should return Flurry data formatted for the Graph library', function () {
      var graphData = FlurryFactory.getChartJSData(flurryData);

      expect(graphData.datasets).toEqual(jasmine.any(Array));  

    });
  });
});
