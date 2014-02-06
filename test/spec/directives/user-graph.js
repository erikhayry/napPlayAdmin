'use strict';

describe('Directive: userGraph', function () {

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	var element, scope, isolateScope;

	beforeEach(module('templates/user-graph.html'));

	beforeEach(inject(function ($rootScope, $compile) {
		//add an element for each type of metrics (app and event)
		element = angular.element('<user-graph user-id="51702d54e4b0679b9dc83075"></user-graph>');
		scope = $rootScope;
		$compile(element)(scope);
		scope.$digest();
		isolateScope = element.isolateScope();
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_UserFactory_, $injector, _$timeout_, _$cacheFactory_) {
		$timeout = _$timeout_;
		$cacheFactory = _$cacheFactory_;
		UserFactory = _UserFactory_;
		$httpBackend = $injector.get('$httpBackend');
	}));

	//make sure no expectations were missed in your tests.
	//(e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

});
