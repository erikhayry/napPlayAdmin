'use strict';

describe('Controller: FlurryEventMetricsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var FlurryEventMetricsPageCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		FlurryEventMetricsPageCtrl = $controller('FlurryEventMetricsPageCtrl', {
			$scope: scope
		});
	}));

	it('should set the page name', function () {
		expect(scope.pageName).toBe('Stats - Flurry - Event metrics');
	});
});
