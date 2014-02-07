'use strict';

describe('Controller: UserRelationshipsPageCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var UserRelationshipsPageCtrl,
		scope, routeParams = {
			userId: '123456'
		};

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();

		UserRelationshipsPageCtrl = $controller('UserRelationshipsPageCtrl', {
			$scope: scope,
			$routeParams : routeParams
		});
	}));

	it('should set the page title', function () {
		expect(scope.pageName).toBe('User relationships');
	});

	it('should set the user id', function () {
		expect(scope.userId).toBe('123456');
	});
});
