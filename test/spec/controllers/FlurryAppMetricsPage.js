'use strict';

describe('Controller: FlurryAppMetricsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var FlurryAppMetricsPageCtrl,
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
		FlurryAppMetricsPageCtrl = $controller('FlurryAppMetricsPageCtrl', {
			$scope: scope
		});
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$filter = $injector.get('$filter');
	}));

	//make sure no expectations were missed in your tests.
	//(e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should set the page name', function () {
		expect(scope.pageName).toBe('Stats - Flurry - App metrics');
	});

	it('should get flurry app metrics', function () {
		expect(scope.metrics.length).toBe(10);
	});

	describe('scope.getGraph', function () {
		it('should set the graph object', function () {
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
			expect(scope.graph.type).toBe('app');
		});
	});
});
