'use strict';

describe('Controller: FlurryAppMetricsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var FlurryAppMetricsPageCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		FlurryAppMetricsPageCtrl = $controller('FlurryAppMetricsPageCtrl', {
			$scope: scope
		});
	}));

	it('should set the page name', function () {
		expect(scope.pageName).toBe('Stats - Flurry - App metrics');
	});
});
