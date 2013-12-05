'use strict';

describe('Service: FlurryFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  var $httpBackend,
      $timeout,
      FlurryFactory,
      flurryApiUrl_ActiveUsers = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
      flurryApiUrl_Sessions = 'http://api.flurry.com/appMetrics/Sessions?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',     
      flurryData = [{"@endDate":"2013-11-12","@metric":"ActiveUsersByDay","@startDate":"2013-10-01","@generatedDate":"11/21/13 6:26 AM","@version":"1.0","day":[{"@date":"2013-10-01","@value":"159"},{"@date":"2013-10-02","@value":"189"},{"@date":"2013-10-03","@value":"207"},{"@date":"2013-10-04","@value":"182"},{"@date":"2013-10-05","@value":"127"},{"@date":"2013-10-06","@value":"170"},{"@date":"2013-10-07","@value":"166"},{"@date":"2013-10-08","@value":"142"},{"@date":"2013-10-09","@value":"134"},{"@date":"2013-10-10","@value":"138"},{"@date":"2013-10-11","@value":"131"},{"@date":"2013-10-12","@value":"127"},{"@date":"2013-10-13","@value":"186"},{"@date":"2013-10-14","@value":"172"},{"@date":"2013-10-15","@value":"154"},{"@date":"2013-10-16","@value":"147"},{"@date":"2013-10-17","@value":"131"},{"@date":"2013-10-18","@value":"124"},{"@date":"2013-10-19","@value":"129"},{"@date":"2013-10-20","@value":"121"},{"@date":"2013-10-21","@value":"127"},{"@date":"2013-10-22","@value":"118"},{"@date":"2013-10-23","@value":"136"},{"@date":"2013-10-24","@value":"182"},{"@date":"2013-10-25","@value":"151"},{"@date":"2013-10-26","@value":"135"},{"@date":"2013-10-27","@value":"134"},{"@date":"2013-10-28","@value":"134"},{"@date":"2013-10-29","@value":"134"},{"@date":"2013-10-30","@value":"110"},{"@date":"2013-10-31","@value":"122"},{"@date":"2013-11-01","@value":"118"},{"@date":"2013-11-02","@value":"106"},{"@date":"2013-11-03","@value":"110"},{"@date":"2013-11-04","@value":"120"},{"@date":"2013-11-05","@value":"92"},{"@date":"2013-11-06","@value":"208"},{"@date":"2013-11-07","@value":"171"},{"@date":"2013-11-08","@value":"137"},{"@date":"2013-11-09","@value":"135"},{"@date":"2013-11-10","@value":"115"},{"@date":"2013-11-11","@value":"110"},{"@date":"2013-11-12","@value":"123"}]},{"@endDate":"2013-11-12","@metric":"Sessions","@startDate":"2013-10-01","@generatedDate":"11/21/13 6:26 AM","@version":"1.0","day":[{"@date":"2013-10-01","@value":"556"},{"@date":"2013-10-02","@value":"515"},{"@date":"2013-10-03","@value":"667"},{"@date":"2013-10-04","@value":"577"},{"@date":"2013-10-05","@value":"216"},{"@date":"2013-10-06","@value":"309"},{"@date":"2013-10-07","@value":"412"},{"@date":"2013-10-08","@value":"366"},{"@date":"2013-10-09","@value":"284"},{"@date":"2013-10-10","@value":"314"},{"@date":"2013-10-11","@value":"260"},{"@date":"2013-10-12","@value":"201"},{"@date":"2013-10-13","@value":"286"},{"@date":"2013-10-14","@value":"340"},{"@date":"2013-10-15","@value":"278"},{"@date":"2013-10-16","@value":"265"},{"@date":"2013-10-17","@value":"281"},{"@date":"2013-10-18","@value":"213"},{"@date":"2013-10-19","@value":"226"},{"@date":"2013-10-20","@value":"189"},{"@date":"2013-10-21","@value":"245"},{"@date":"2013-10-22","@value":"193"},{"@date":"2013-10-23","@value":"324"},{"@date":"2013-10-24","@value":"492"},{"@date":"2013-10-25","@value":"281"},{"@date":"2013-10-26","@value":"229"},{"@date":"2013-10-27","@value":"209"},{"@date":"2013-10-28","@value":"194"},{"@date":"2013-10-29","@value":"264"},{"@date":"2013-10-30","@value":"222"},{"@date":"2013-10-31","@value":"231"},{"@date":"2013-11-01","@value":"215"},{"@date":"2013-11-02","@value":"147"},{"@date":"2013-11-03","@value":"174"},{"@date":"2013-11-04","@value":"316"},{"@date":"2013-11-05","@value":"164"},{"@date":"2013-11-06","@value":"553"},{"@date":"2013-11-07","@value":"420"},{"@date":"2013-11-08","@value":"344"},{"@date":"2013-11-09","@value":"228"},{"@date":"2013-11-10","@value":"189"},{"@date":"2013-11-11","@value":"238"},{"@date":"2013-11-12","@value":"294"}]}];
  
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
        // one call for each metrics value
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
          //object returned from mocked async call
          expect(data).toEqual(jasmine.any(Object));
        });
      });
  });


  describe('getChartJSData', function () {
    it('should return Flurry data formatted for the Graph library', function () {
      var graphData = FlurryFactory.getChartJSData(flurryData, 'bar');

      //current max amount of graph dots
      expect(graphData.labels.length).toBeLessThan(20);

      //all array values in the flurryData object should have been converted to a dataset
      expect(graphData.datasets.length).toEqual(2);

      //length of the data set and labels should match  
      expect(graphData.datasets[0].data.length).toEqual(graphData.labels.length);  

    });
  });
});
