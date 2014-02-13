'use strict';

angular.module('napPlayAdminApp')
	.controller('DateCtrl', function ($scope) {
		var _init = function () {
			//http://angular-ui.github.io/bootstrap/#/datepicker
			$scope.today();
			$scope.toggleMax();
			$scope.dateOptions = {
				'year-format': '"yy"',
				'starting-day': 1
			};
			$scope.format = 'dd-MMMM-yyyy';
		};

		//make dateFrom and dateTo accessable on the parent scope
		$scope.$watch('dateFrom', function (newDate) {
			$scope.$parent.dateFrom = newDate;
		});

		$scope.$watch('dateTo', function (newDate) {
			$scope.$parent.dateTo = newDate;
		});

		//date picker functions
		$scope.openFromDropDown = function ($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.openedFrom = true;
		};

		$scope.openToDropDown = function ($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.openedTo = true;
		};

		$scope.today = function () {
			$scope.dateFrom = new Date();
			$scope.dateTo = new Date();
			$scope.dateFrom.setDate($scope.dateFrom.getDate() - 30);
			$scope.dateTo.setDate($scope.dateTo.getDate() - 1);
		};

		$scope.toggleMax = function () {
			$scope.maxDate = ($scope.maxDate) ? null : new Date();
		};

		_init();

	});
