'use strict';

describe('Controller: FlurryPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var FlurryPageCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		FlurryPageCtrl = $controller('FlurryPageCtrl', {
			$scope: scope
		});
	}));

	it('should set the page name', function () {
		expect(scope.pageName).toBe('Stats - Flurry');
	});
});
