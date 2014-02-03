'use strict';

describe('Service: FlurryFactory', function () {

	/*
    setup
   */

	// load the service's module
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.preferredLanguage();
	}));

	beforeEach(module('napPlayAdminApp'));

	var $httpBackend,
		$timeout, $cacheFactory, $translate,
		FlurryFactory, Cache,

		// app metrics
		flurryApiUrl_ActiveUsers = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
		flurryApiUrl_ActiveUsersDateLater = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-13',
		flurryApiUrl_Sessions = 'http://api.flurry.com/appMetrics/Sessions?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
		flurryApiUrl_PageViews = 'http://api.flurry.com/appMetrics/PageViews?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',

		flurryData = [{
			"@endDate": "2013-11-12",
			"@metric": "ActiveUsersByDay",
			"@startDate": "2013-10-01",
			"@generatedDate": "11/21/13 6:26 AM",
			"@version": "1.0",
			"day": [{
				"@date": "2013-10-01",
				"@value": "159"
			}, {
				"@date": "2013-10-02",
				"@value": "189"
			}, {
				"@date": "2013-10-03",
				"@value": "207"
			}, {
				"@date": "2013-10-04",
				"@value": "182"
			}, {
				"@date": "2013-10-05",
				"@value": "127"
			}, {
				"@date": "2013-10-06",
				"@value": "170"
			}, {
				"@date": "2013-10-07",
				"@value": "166"
			}, {
				"@date": "2013-10-08",
				"@value": "142"
			}, {
				"@date": "2013-10-09",
				"@value": "134"
			}, {
				"@date": "2013-10-10",
				"@value": "138"
			}, {
				"@date": "2013-10-11",
				"@value": "131"
			}, {
				"@date": "2013-10-12",
				"@value": "127"
			}, {
				"@date": "2013-10-13",
				"@value": "186"
			}, {
				"@date": "2013-10-14",
				"@value": "172"
			}, {
				"@date": "2013-10-15",
				"@value": "154"
			}, {
				"@date": "2013-10-16",
				"@value": "147"
			}, {
				"@date": "2013-10-17",
				"@value": "131"
			}, {
				"@date": "2013-10-18",
				"@value": "124"
			}, {
				"@date": "2013-10-19",
				"@value": "129"
			}, {
				"@date": "2013-10-20",
				"@value": "121"
			}, {
				"@date": "2013-10-21",
				"@value": "127"
			}, {
				"@date": "2013-10-22",
				"@value": "118"
			}, {
				"@date": "2013-10-23",
				"@value": "136"
			}, {
				"@date": "2013-10-24",
				"@value": "182"
			}, {
				"@date": "2013-10-25",
				"@value": "151"
			}, {
				"@date": "2013-10-26",
				"@value": "135"
			}, {
				"@date": "2013-10-27",
				"@value": "134"
			}, {
				"@date": "2013-10-28",
				"@value": "134"
			}, {
				"@date": "2013-10-29",
				"@value": "134"
			}, {
				"@date": "2013-10-30",
				"@value": "110"
			}, {
				"@date": "2013-10-31",
				"@value": "122"
			}, {
				"@date": "2013-11-01",
				"@value": "118"
			}, {
				"@date": "2013-11-02",
				"@value": "106"
			}, {
				"@date": "2013-11-03",
				"@value": "110"
			}, {
				"@date": "2013-11-04",
				"@value": "120"
			}, {
				"@date": "2013-11-05",
				"@value": "92"
			}, {
				"@date": "2013-11-06",
				"@value": "208"
			}, {
				"@date": "2013-11-07",
				"@value": "171"
			}, {
				"@date": "2013-11-08",
				"@value": "137"
			}, {
				"@date": "2013-11-09",
				"@value": "135"
			}, {
				"@date": "2013-11-10",
				"@value": "115"
			}, {
				"@date": "2013-11-11",
				"@value": "110"
			}, {
				"@date": "2013-11-12",
				"@value": "123"
			}]
		}, {
			"@endDate": "2013-11-12",
			"@metric": "Sessions",
			"@startDate": "2013-10-01",
			"@generatedDate": "11/21/13 6:26 AM",
			"@version": "1.0",
			"day": [{
				"@date": "2013-10-01",
				"@value": "556"
			}, {
				"@date": "2013-10-02",
				"@value": "515"
			}, {
				"@date": "2013-10-03",
				"@value": "667"
			}, {
				"@date": "2013-10-04",
				"@value": "577"
			}, {
				"@date": "2013-10-05",
				"@value": "216"
			}, {
				"@date": "2013-10-06",
				"@value": "309"
			}, {
				"@date": "2013-10-07",
				"@value": "412"
			}, {
				"@date": "2013-10-08",
				"@value": "366"
			}, {
				"@date": "2013-10-09",
				"@value": "284"
			}, {
				"@date": "2013-10-10",
				"@value": "314"
			}, {
				"@date": "2013-10-11",
				"@value": "260"
			}, {
				"@date": "2013-10-12",
				"@value": "201"
			}, {
				"@date": "2013-10-13",
				"@value": "286"
			}, {
				"@date": "2013-10-14",
				"@value": "340"
			}, {
				"@date": "2013-10-15",
				"@value": "278"
			}, {
				"@date": "2013-10-16",
				"@value": "265"
			}, {
				"@date": "2013-10-17",
				"@value": "281"
			}, {
				"@date": "2013-10-18",
				"@value": "213"
			}, {
				"@date": "2013-10-19",
				"@value": "226"
			}, {
				"@date": "2013-10-20",
				"@value": "189"
			}, {
				"@date": "2013-10-21",
				"@value": "245"
			}, {
				"@date": "2013-10-22",
				"@value": "193"
			}, {
				"@date": "2013-10-23",
				"@value": "324"
			}, {
				"@date": "2013-10-24",
				"@value": "492"
			}, {
				"@date": "2013-10-25",
				"@value": "281"
			}, {
				"@date": "2013-10-26",
				"@value": "229"
			}, {
				"@date": "2013-10-27",
				"@value": "209"
			}, {
				"@date": "2013-10-28",
				"@value": "194"
			}, {
				"@date": "2013-10-29",
				"@value": "264"
			}, {
				"@date": "2013-10-30",
				"@value": "222"
			}, {
				"@date": "2013-10-31",
				"@value": "231"
			}, {
				"@date": "2013-11-01",
				"@value": "215"
			}, {
				"@date": "2013-11-02",
				"@value": "147"
			}, {
				"@date": "2013-11-03",
				"@value": "174"
			}, {
				"@date": "2013-11-04",
				"@value": "316"
			}, {
				"@date": "2013-11-05",
				"@value": "164"
			}, {
				"@date": "2013-11-06",
				"@value": "553"
			}, {
				"@date": "2013-11-07",
				"@value": "420"
			}, {
				"@date": "2013-11-08",
				"@value": "344"
			}, {
				"@date": "2013-11-09",
				"@value": "228"
			}, {
				"@date": "2013-11-10",
				"@value": "189"
			}, {
				"@date": "2013-11-11",
				"@value": "238"
			}, {
				"@date": "2013-11-12",
				"@value": "294"
			}]
		}],

		// event metrics
		flurryEventMetricsSummaryUrl = 'http://api.flurry.com/eventMetrics/Summary?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-12-11&endDate=2014-01-10',

		flurryEventMetricsSummaryData = [
			'some data'
		];

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_FlurryFactory_, $injector, _$timeout_, _$cacheFactory_) {
		$timeout = _$timeout_;
		$cacheFactory = _$cacheFactory_;
		FlurryFactory = _FlurryFactory_;
		$httpBackend = $injector.get('$httpBackend');
	}));

	//make sure no expectations were missed in your tests.
	//(e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	/*
    tests
   */

	describe('getEventMetricsSummary', function () {
		it('should return an object of a flurry metrics summary', function () {
			var flurryEventMetrics;

			FlurryFactory.getEventMetricsSummary('2013-12-11', '2014-01-10').success(function (data) {
				var flurryEventMetrics = data;
				expect(flurryEventMetrics.length).toBe(1);
			});

			$httpBackend.expectGET(flurryEventMetricsSummaryUrl).respond(200, flurryEventMetricsSummaryData);
			$httpBackend.flush();
		});
	});

	describe('getAppMetrics', function () {
		it('should return an array of flurry metrics', function () {
			var flurryMetrics = FlurryFactory.getAppMetrics();

			//current amount of different flurry metrics
			expect(flurryMetrics.length).toBe(10);

			//all array values should be an object with keys value and name
			for (var i = 0; i < flurryMetrics.length; i++) {
				expect(flurryMetrics[i].value).toEqual(jasmine.any(String));
				expect(flurryMetrics[i].name).toEqual(jasmine.any(String));
			};
		});
	});

	describe("getGraphData", function () {
		var flag, data;

		beforeEach(inject(function ($injector) {
			// one call for each metrics value
			//$httpBackend.expectGET(flurryApiUrl_ActiveUsers).respond(200, flurryData[0]);
			//$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);
			Cache = $cacheFactory.get('flurry'), //http://docs.angularjs.org/api/ng.$cacheFactory

			Cache.put('ActiveUsers', {
				data: flurryData[0],
				from: flurryData[0]['@startDate'],
				to: flurryData[0]['@endDate']
			})

		}));

		it("should return cached data if there is otherwhise call api and add pending data as timedout", function () {
			$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);
			$httpBackend.expectGET(flurryApiUrl_PageViews).respond(302, flurryData[1]);

			runs(function () {
				flag = false;

				FlurryFactory.getGraphData(['ActiveUsers', 'Sessions', 'PageViews'], '2013-10-01', '2013-11-12', 'app', {
					retries: 0,
					timeout: 15000
				})
					.then(function (newData) {
						data = newData;
					});

				$timeout.flush(7000);
				$httpBackend.flush();
				flag = true;
			});

			waitsFor(function () {
				return flag;
			}, "The Flurry data should have been returned", 200);

			runs(function () {
				//object returned from mocked async call
				expect(data.data.length).toBe(2);
				expect(data.timedout.length).toBe(0);
				expect(data.errors.length).toBe(1);
			});
		});

		it("should return api data if the dates of the cached data don't cover the requested dates", function () {
			$httpBackend.expectGET(flurryApiUrl_ActiveUsersDateLater).respond(200, flurryData[1]);

			runs(function () {
				flag = false;

				FlurryFactory.getGraphData(['ActiveUsers'], '2013-10-01', '2013-11-13', 'app', {
					retries: 0,
					timeout: 15000
				})
					.then(function (newData) {
						data = newData;
					});

				$timeout.flush(7000);
				$httpBackend.flush();
				flag = true;
			});

			waitsFor(function () {
				return flag;
			}, "The Flurry data should have been returned", 200);

			runs(function () {
				//object returned from mocked async call
				expect(data.data.length).toBe(1);
				expect(data.timedout.length).toBe(0);
				expect(data.errors.length).toBe(0);
			});
		});

		it("should return data from the api if no cached data exists", function () {
			$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);

			runs(function () {
				flag = false;

				FlurryFactory.getGraphData(['Sessions'], '2013-10-01', '2013-11-12', 'app', {
					retries: 0,
					timeout: 15000
				})
					.then(function (newData) {
						data = newData;
					});

				$timeout.flush(4000);
				$httpBackend.flush();
				flag = true;
			});

			waitsFor(function () {
				return flag;
			}, "The Flurry data should have been returned", 200);

			runs(function () {
				//object returned from mocked async call
				expect(data.data.length).toBe(1);
				expect(data.timedout.length).toBe(0);
				expect(data.errors.length).toBe(0);
			});
		});

		it("should return error data if api returns error", function () {
			$httpBackend.expectGET(flurryApiUrl_Sessions).respond(302, flurryData[1]);

			runs(function () {
				flag = false;

				FlurryFactory.getGraphData(['Sessions'], '2013-10-01', '2013-11-12', 'app', {
					retries: 0,
					timeout: 15000
				})
					.then(function (newData) {
						data = newData;
					});

				$timeout.flush(4000);
				$httpBackend.flush();
				flag = true;
			});

			waitsFor(function () {
				return flag;
			}, "The Flurry data should have been returned", 200);

			runs(function () {
				//object returned from mocked async call
				expect(data.data.length).toBe(0);
				expect(data.timedout.length).toBe(0);
				expect(data.errors.length).toBe(1);
			});
		});

		it("should return timedout data if api takes too long to return data", function () {
			$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);

			runs(function () {
				flag = false;

				FlurryFactory.getGraphData(['Sessions'], '2013-10-01', '2013-11-12', 'app', {
					retries: 0,
					timeout: 100
				})
					.then(function (newData) {
						data = newData;
					});

				$timeout.flush(4000);
				$httpBackend.flush();
				flag = true;
			});

			waitsFor(function () {
				return flag;
			}, "The Flurry data should have been returned", 200);

			runs(function () {
				//object returned from mocked async call
				expect(data.data.length).toBe(0);
				expect(data.timedout.length).toBe(1);
				expect(data.errors.length).toBe(0);
			});
		});

		it("should return data from the api if no cached data exists on first run. Return cached data on second run if dates are covered", function () {
			/*
          First run
         */

			$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);

			runs(function () {
				flag = false;

				FlurryFactory.getGraphData(['Sessions'], '2013-10-01', '2013-11-12', 'app', {
					retries: 0,
					timeout: 15000
				})
					.then(function (newData) {
						data = newData;
					});

				$timeout.flush(4000);
				$httpBackend.flush();
				flag = true;
			});

			waitsFor(function () {
				return flag;
			}, "The Flurry data should have been returned", 200);

			runs(function () {
				//object returned from mocked async call
				expect(data.data.length).toBe(1);
				expect(data.timedout.length).toBe(0);
				expect(data.errors.length).toBe(0);

				/*
            Second run
           */
				console.log('Second run')

				runs(function () {
					flag = false;

					FlurryFactory.getGraphData(['Sessions'], '2013-10-01', '2013-11-11', 'app', {
						retries: 0,
						timeout: 15000
					})
						.then(function (newData) {
							data = newData;
						});

					$timeout.flush(4000);
					flag = true;
				});

				waitsFor(function () {
					return flag;
				}, "The Flurry data should have been returned", 200);

				runs(function () {
					//object returned from mocked async call
					expect(data.data.length).toBe(1);
					expect(data.timedout.length).toBe(0);
					expect(data.errors.length).toBe(0);

					/*
              Third run to make sure the inital stored data hasn't been changed
             */
					console.log('Third run')

					runs(function () {
						flag = false;

						FlurryFactory.getGraphData(['Sessions'], '2013-10-02', '2013-11-12', 'app', {
							retries: 0,
							timeout: 15000
						})
							.then(function (newData) {
								data = newData;
							});

						$timeout.flush(4000);
						flag = true;
					});

					waitsFor(function () {
						return flag;
					}, "The Flurry data should have been returned", 200);

					runs(function () {
						//object returned from mocked async call
						expect(data.data.length).toBe(1);
						expect(data.timedout.length).toBe(0);
						expect(data.errors.length).toBe(0);
					});

				});

			});
		});
	});

});
