'use strict';

describe('Directive: user-data', function () {

	beforeEach(module('napPlayAdminApp'));

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	var element, scope, isolateScope;

	beforeEach(module('templates/userData.html'));

	beforeEach(inject(function ($rootScope, $compile) {
		element = angular.element('<user-data user-id="USERID"></user-data>');
		scope = $rootScope;
		$compile(element)(scope);
		scope.$digest();
		isolateScope = element.isolateScope();
	}));

	/*
    setup async mocks
   */

	var flag, $httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));

	//make sure no expectations were missed in your tests.
	//(e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	//currently throw an Error: Declaration Location
	/*it("should have the correct status strings", function () {

	});*/
});
