'use strict';

describe('Controller: FlurryEventMetricsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var FlurryEventMetricsPageCtrl,
		scope, $httpBackend, $filter;

	// load the service's module
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.preferredLanguage();
	}));

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		FlurryEventMetricsPageCtrl = $controller('FlurryEventMetricsPageCtrl', {
			$scope: scope
		});
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$filter = $injector.get('$filter');
	}));

	var _mockEventMetrics = {
		'@endDate': '2014-02-05',
		'@startDate': '2014-01-07',
		'@type': 'Summary',
		'@generatedDate': '2/6/14 9:28 AM',
		'@version': '1.0',
		event: [{
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '68',
			'@avgUsersLastWeek': '27',
			'@eventName': 'Login',
			'@totalCount': '149',
			'@totalSessions': '142',
			'@usersLastDay': '2',
			'@usersLastMonth': '132',
			'@usersLastWeek': '21'
		}, {
			'@avgUsersLastDay': '5',
			'@avgUsersLastMonth': '45',
			'@avgUsersLastWeek': '23',
			'@eventName': 'Suggested Search',
			'@totalCount': '387',
			'@totalSessions': '183',
			'@usersLastDay': '9',
			'@usersLastMonth': '78',
			'@usersLastWeek': '35'
		}]
	},
		_mockEventMetrics2 = {
			'@endDate': '2014-02-05',
			'@startDate': '2014-01-07',
			'@type': 'Summary',
			'@generatedDate': '2/6/14 9:28 AM',
			'@version': '1.0',
			event: [{
				'@avgUsersLastDay': '5',
				'@avgUsersLastMonth': '68',
				'@avgUsersLastWeek': '27',
				'@eventName': 'Login',
				'@totalCount': '149',
				'@totalSessions': '142',
				'@usersLastDay': '2',
				'@usersLastMonth': '132',
				'@usersLastWeek': '21'
			}, {
				'@avgUsersLastDay': '5',
				'@avgUsersLastMonth': '45',
				'@avgUsersLastWeek': '23',
				'@eventName': 'Suggested Search',
				'@totalCount': '387',
				'@totalSessions': '183',
				'@usersLastDay': '9',
				'@usersLastMonth': '78',
				'@usersLastWeek': '35'
			}, {
				'@avgUsersLastDay': '5',
				'@avgUsersLastMonth': '45',
				'@avgUsersLastWeek': '23',
				'@eventName': 'Suggested Search',
				'@totalCount': '387',
				'@totalSessions': '183',
				'@usersLastDay': '9',
				'@usersLastMonth': '78',
				'@usersLastWeek': '35'
			}]
		},
		_onEach = function () {

			var _from = new Date();
			var _to = new Date();
			_to.setDate(_to.getDate() - 1);
			_from.setDate(_from.getDate() - 30);
			_to = $filter('date')(_to, 'yyyy-MM-dd');
			_from = $filter('date')(_from, 'yyyy-MM-dd');

			$httpBackend.expectGET('http://api.flurry.com/eventMetrics/Summary?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=' + _from + '&endDate=' + _to).respond(200, _mockEventMetrics);
			$httpBackend.flush();
		};

	//make sure no expectations were missed in your tests.
	//(e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should get flurry app metrics', function () {
		_onEach();
		expect(scope.metrics.length).toBe(2);
	});

	describe('$scope.getMetrics', function () {
		it('should get and set metrics', function () {
			_onEach();
			expect(scope.metrics.length).toBe(2);

			$httpBackend.expectGET('http://api.flurry.com/eventMetrics/Summary?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM&startDate=2014-01-07&endDate=2014-01-07').respond(200, _mockEventMetrics2);
			scope.getMetrics('2014-01-07', '2014-01-07');
			$httpBackend.flush();
			expect(scope.metrics.length).toBe(3);
			expect(scope.metrics[0].name).toBe('Login');
			expect(scope.metrics[0].value).toBe('Login');

		});
	});

	describe('scope.getGraph', function () {
		it('should set the graph object', function () {
			_onEach();
			var metrics = [{
					checked: 'true',
					name: 'Active Users',
					value: 'ActiveUsers'
				},

				{
					checked: 'true',
					name: 'Active Users By Week',
					value: 'ActiveUsersByWeek'
				},

				{
					checked: 'true',
					name: 'Active Users By Month',
					value: 'ActiveUsersByMonth'
				},

				{
					checked: 'true',
					name: 'New Users',
					value: 'NewUsers'
				},

				{
					checked: 'true',
					name: 'Avg Page Views Per Session',
					value: 'AvgPageViewsPerSession'
				}
			];

			scope.getGraph(metrics, '01.01.2013', '01.01.2014');

			expect(scope.graph.metrics).toBe('ActiveUsers,ActiveUsersByWeek,ActiveUsersByMonth,NewUsers,AvgPageViewsPerSession');
			expect(scope.graph.from).toBe('01.01.2013');
			expect(scope.graph.to).toBe('01.01.2014');
			expect(scope.graph.type).toBe('event');
		});
	});

});
