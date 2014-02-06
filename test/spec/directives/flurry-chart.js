'use strict';

describe('Directive: flurry-chart', function () {

	beforeEach(module('napPlayAdminApp'));

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	var element, scope, isolateScope;

	beforeEach(module('templates/chart.html'));

	beforeEach(inject(function ($rootScope, $compile) {
		//add an element for each type of metrics (app and event)
		element = angular.element('<flurry-chart flurryFrom="2013-10-01" flurryTo="2013-11-12" flurryMetrics="ActiveUsers, Sessions" flurryType="app"></flurry-chart><flurry-chart flurryFrom="2013-10-01" flurryTo="2013-11-12" flurryMetrics="account registration, Login" flurryType="event"></flurry-chart>');
		scope = $rootScope;
		$compile(element)(scope);
		scope.$digest();
		isolateScope = element.isolateScope();
	}));

	/*
    setup async mocks
   */

	var flag, data, $httpBackend,
		$timeout, $cacheFactory,
		FlurryFactory, Cache,

		//app urls
		flurryApiUrl_ActiveUsers = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
		flurryApiUrl_ActiveUsersDateLater = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-13',
		flurryApiUrl_Sessions = 'http://api.flurry.com/appMetrics/Sessions?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',
		flurryApiUrl_PageViews = 'http://api.flurry.com/appMetrics/PageViews?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2013-10-01&endDate=2013-11-12',

		//event urls
		flurryApiUrl_AccReg = 'http://api.flurry.com/eventMetrics/Event?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&eventName=account registration&startDate=2013-10-01&endDate=2013-11-12',
		flurryApiUrl_Login = 'http://api.flurry.com/eventMetrics/Event?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&eventName=Login&startDate=2013-10-01&endDate=2013-11-12',

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
		}];

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

	it("should have the correct status strings", function () {
		$httpBackend.expectGET(flurryApiUrl_ActiveUsers).respond(200, flurryData[0]);
		$httpBackend.expectGET(flurryApiUrl_AccReg).respond(200, []);
		$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);
		$httpBackend.expectGET(flurryApiUrl_Login).respond(200, []);

		expect(isolateScope.status).toEqual('is-loading');

		runs(function () {
			flag = false;
			$timeout.flush(7000);
			$httpBackend.flush();
			flag = true;
		});

		waitsFor(function () {
			return flag;
		}, "The Flurry data should have been returned", 200);

		runs(function () {
			//object returned from mocked async call
			expect(isolateScope.status).toEqual('is-loaded');
		});
	});

	it("should have timedout data", function () {
		$httpBackend.expectGET(flurryApiUrl_ActiveUsers).respond(200, flurryData[0]);
		$httpBackend.expectGET(flurryApiUrl_AccReg).respond(200, []);
		$httpBackend.expectGET(flurryApiUrl_Sessions).respond(200, flurryData[1]);
		$httpBackend.expectGET(flurryApiUrl_Login).respond(200, []);

		expect(isolateScope.timedout.length).toBe(0);
		expect(isolateScope.errors.length).toBe(0);

		runs(function () {
			flag = false;
			$timeout.flush(20000); //wait to flush after timeout
			$httpBackend.flush();
			flag = true;
		});

		waitsFor(function () {
			return flag;
		}, "The Flurry data should have been returned", 200);

		runs(function () {
			//object returned from mocked async call
			expect(isolateScope.timedout.length).toBe(2);
		});
	});

	it("should have error data", function () {
		$httpBackend.expectGET(flurryApiUrl_ActiveUsers).respond(302, flurryData[0]);
		$httpBackend.expectGET(flurryApiUrl_AccReg).respond(302, []);
		$httpBackend.expectGET(flurryApiUrl_Sessions).respond(302, flurryData[1]);
		$httpBackend.expectGET(flurryApiUrl_Login).respond(302, []);

		expect(isolateScope.timedout.length).toBe(0);
		expect(isolateScope.errors.length).toBe(0);

		runs(function () {
			flag = false;
			$timeout.flush(4000); //wait to flush after timeout
			$httpBackend.flush();
			flag = true;
		});

		waitsFor(function () {
			return flag;
		}, "The Flurry data should have been returned", 200);

		runs(function () {
			//object returned from mocked async call
			expect(isolateScope.errors.length).toBe(2);
		});
	});

});
