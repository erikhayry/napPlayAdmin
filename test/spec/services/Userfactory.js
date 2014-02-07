'use strict';

describe('Service: UserFactory', function () {

	// load the service's module
	beforeEach(module('napPlayAdminApp'));

	//use empy language object to prevent the $translateProvider make http calls
	beforeEach(module('pascalprecht.translate', function ($translateProvider) {
		$translateProvider.translations('en', {});
	}));

	var $httpBackend,
		$timeout, $cacheFactory,
		UserFactory,

		subGraphUrl = 'https://nap-play.herokuapp.com/api/subgraph/51702d54e4b0679b9dc83075?depth=1&country=GB&authToken=ccd14408da968eae1faf54f982c0ae8f10063a48dc0ff282d6e82a6282b7e4e032d3b82059c4271081ba582fb32a358bbea13c3d29ccc4b5ed0ec9991164120a',
		userDataUrl = 'https://nap-play.herokuapp.com/api/users/51702d54e4b0679b9dc83075?country=GB&authToken=ccd14408da968eae1faf54f982c0ae8f10063a48dc0ff282d6e82a6282b7e4e032d3b82059c4271081ba582fb32a358bbea13c3d29ccc4b5ed0ec9991164120a',
		mockData = ['userdata'];

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_UserFactory_, $injector, _$timeout_, _$cacheFactory_) {
		$timeout = _$timeout_;
		$cacheFactory = _$cacheFactory_;
		UserFactory = _UserFactory_;
		$httpBackend = $injector.get('$httpBackend');
	}));

	// make sure no expectations were missed in your tests.
	// (e.g. expectGET or expectPOST)
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	// instantiate service
	beforeEach(inject(function (_UserFactory_) {
		UserFactory = _UserFactory_;
	}));

	//tests
	describe('getUserData', function () {
		it('should return user data', function () {
			UserFactory.getUserData('51702d54e4b0679b9dc83075').success(function (data) {
				var userData = data;
				expect(userData.length).toBe(1);
			});

			$httpBackend.expectGET(userDataUrl).respond(200, mockData);
			$httpBackend.flush();
		});
	});

	describe('getSubGraph', function () {
		it('should return user data', function () {
			UserFactory.getSubGraph('51702d54e4b0679b9dc83075').success(function (data) {
				var subGraphData = data;
				expect(subGraphData.length).toBe(1);
			});

			$httpBackend.expectGET(subGraphUrl).respond(200, mockData);
			$httpBackend.flush();
		});
	});

});
