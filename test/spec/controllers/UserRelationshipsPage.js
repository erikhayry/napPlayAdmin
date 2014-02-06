'use strict';

describe('Controller: UserRelationshipsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var UserRelationshipsPageCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		UserRelationshipsPageCtrl = $controller('UserRelationshipsPageCtrl', {
			$scope: scope
		});
	}));

	it('should set the page title', function () {
		expect(scope.pageName).toBe('User relationships');
	});
});
