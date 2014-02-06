'use strict';

describe('Controller: FlurryEventMetricsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var FlurryEventMetricsPageCtrl,
		scope, mockEvent, $httpBackend, $translateProvider;

	// load the service's module
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.preferredLanguage();
	}));

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, $injector) {
		scope = $rootScope.$new();
		FlurryEventMetricsPageCtrl = $controller('FlurryEventMetricsPageCtrl', {
			$scope: scope
		});
		//$httpBackend = $injector.get('$httpBackend');
	}));

	beforeEach(function() {
  		mockEvent = new Event('build');
  		spyOn(mockEvent,'preventDefault');
	});


	// Initialize the controller and a mock scope
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));
	
	var _mockEventMetrics = {
		'@endDate': "2014-02-05",
		'@startDate': "2014-01-07",
		'@type': "Summary",
		'@generatedDate': "2/6/14 9:28 AM",
		'@version': "1.0",
		event: [
			{
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '68',
			'@avgUsersLastWeek': '27',
			'@eventName': 'Login',
			'@totalCount': '149',
			'@totalSessions': '142',
			'@usersLastDay': '2',
			'@usersLastMonth': '132',
			'@usersLastWeek': '21'
			},
			{
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '45',
			'@avgUsersLastWeek': '23',
			'@eventName': 'Suggested Search',
			'@totalCount': '387',
			'@totalSessions': '183',
			'@usersLastDay': '9',
			'@usersLastMonth': '78',
			'@usersLastWeek': '35'
			}
		]
	},
	_mockEventMetrics2 = {
		'@endDate': "2014-02-05",
		'@startDate': "2014-01-07",
		'@type': "Summary",
		'@generatedDate': "2/6/14 9:28 AM",
		'@version': "1.0",
		event: [
			{
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '68',
			'@avgUsersLastWeek': '27',
			'@eventName': 'Login',
			'@totalCount': '149',
			'@totalSessions': '142',
			'@usersLastDay': '2',
			'@usersLastMonth': '132',
			'@usersLastWeek': '21'
			},
			{
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '45',
			'@avgUsersLastWeek': '23',
			'@eventName': 'Suggested Search',
			'@totalCount': '387',
			'@totalSessions': '183',
			'@usersLastDay': '9',
			'@usersLastMonth': '78',
			'@usersLastWeek': '35'
			},
			{
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '45',
			'@avgUsersLastWeek': '23',
			'@eventName': 'Suggested Search',
			'@totalCount': '387',
			'@totalSessions': '183',
			'@usersLastDay': '9',
			'@usersLastMonth': '78',
			'@usersLastWeek': '35'
			}
		]
	},
	_onEach = function(){	
		$httpBackend.expectGET('http://api.flurry.com/eventMetrics/Summary?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2014-01-07&endDate=2014-02-05').respond(200, _mockEventMetrics);
		$httpBackend.flush();		
	}


	//make sure no expectations were missed in your tests.
	//(e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should set the page name', function () {
		_onEach();
		expect(scope.pageName).toBe('Stats - Flurry - Event metrics');
	});

	it('should get flurry app metrics', function () {
		_onEach();
		expect(scope.metrics.length).toBe(2);
	});

	it('should set today date', function () {
		_onEach();
		var from = new Date();
		var to = new Date()
		to.setDate(to.getDate() - 1)
		from.setDate(from.getDate() - 30)
		
		expect(scope.dateFrom.toString()).toBe(from.toString());
		expect(scope.dateTo.toString()).toEqual(to.toString());
	});

	it('should set a max date', function () {
		_onEach();
		expect(scope.maxDate).toBeDefined();
	});

	it('should set date options', function () {
		_onEach();
		expect(scope.dateOptions['year-format']).toBe('"yy"');
		expect(scope.dateOptions['starting-day']).toBe(1);
	});

	it('should set date format', function () {
		_onEach();
		expect(scope.format).toBe('dd-MMMM-yyyy');
	});

	describe('$scope.getMetrics', function(){
		it('should get and set metrics', function(){
			$httpBackend.expectGET('http://api.flurry.com/eventMetrics/Summary?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2014-01-07&endDate=2014-02-05').respond(200, _mockEventMetrics);
			$httpBackend.flush();
			expect(scope.metrics.length).toBe(2);

			
			$httpBackend.expectGET('http://api.flurry.com/eventMetrics/Summary?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2014-01-07&endDate=2014-01-07').respond(200, _mockEventMetrics2);
			scope.getMetrics('2014-01-07', '2014-01-07');
			$httpBackend.flush();
			expect(scope.metrics.length).toBe(3);
			expect(scope.metrics[0].name).toBe('Login');
			expect(scope.metrics[0].value).toBe('Login');

		})
	})

	describe('$scope.openFromDropDown', function(){
		it('should set openedFrom to true', function(){
			_onEach();
			scope.openFromDropDown(mockEvent);
			expect(scope.openedFrom).toBe(true);
		})
	})

	describe('$scope.openToDropDown', function(){
		it('should set openedTo to true', function(){
			_onEach();
			scope.openToDropDown(mockEvent);
			expect(scope.openedTo).toBe(true);
		})
	})
});
