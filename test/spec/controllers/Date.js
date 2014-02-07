'use strict';

describe('Controller: DateCtrl', function () {

	// load the controller's module
	beforeEach(module('napPlayAdminApp'));

	var DateCtrl,
		scope,
		mockEvent;

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

		DateCtrl = $controller('DateCtrl', {
			$scope: scope
		});
	}));

	beforeEach(function () {
		mockEvent = new Event('click');
	});

	it('should set today date', function () {
		var from = new Date();
		var to = new Date();
		to.setDate(to.getDate() - 1);
		from.setDate(from.getDate() - 30);

		expect(scope.dateFrom.toString()).toBe(from.toString());
		expect(scope.dateTo.toString()).toEqual(to.toString());
	});

	it('should set a max date', function () {
		expect(scope.maxDate).toBeDefined();
	});

	it('should set date options', function () {
		expect(scope.dateOptions['year-format']).toBe('"yy"');
		expect(scope.dateOptions['starting-day']).toBe(1);
	});

	it('should set date format', function () {
		expect(scope.format).toBe('dd-MMMM-yyyy');
	});

	it('should watch dateFrom and dateTo and apply value to parent scope', function () {
		scope.dateFrom = '02-02-1999';
		scope.dateTo = '02-02-2000';
		scope.$apply()
		expect(scope.$parent.dateFrom).toBe('02-02-1999');
		expect(scope.$parent.dateTo).toBe('02-02-2000');
	});

	describe('$scope.openFromDropDown', function () {
		it('should set openedFrom to true', function () {
			scope.openFromDropDown(mockEvent);
			expect(scope.openedFrom).toBe(true);
		});
	});

	describe('$scope.openToDropDown', function () {
		it('should set openedTo to true', function () {
			scope.openToDropDown(mockEvent);
			expect(scope.openedTo).toBe(true);
		});
	});
});
