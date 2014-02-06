'use strict';
/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Controllers
 */

/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryEventMetricsPageCtrl
 * @function
 *
 * @description
 * Flurry page controller
 *
 */

angular.module('napPlayAdminApp')
	.controller('FlurryEventMetricsPageCtrl', ['$scope', 'FlurryFactory', '$filter',
		function ($scope, FlurryFactory, $filter) {
			var _init = function () {
				$scope.pageName = 'Stats - Flurry - Event metrics';
				$scope.metrics = [];

				//http://angular-ui.github.io/bootstrap/#/datepicker
				$scope.today();
				$scope.toggleMax();
				$scope.dateOptions = {
					'year-format': '"yy"',
					'starting-day': 1
				};
				$scope.format = 'dd-MMMM-yyyy';

				$scope.getMetrics($filter('date')($scope.dateFrom, 'yyyy-MM-dd'), $filter('date')($scope.dateTo, 'yyyy-MM-dd'));
			};

			$scope.getMetrics = function (from, to) {
				$scope.metrics = [];
				FlurryFactory.getEventMetricsSummary(from, to).success(function (data) {
					for (var i = 0; i < data.event.length; i++) {
						$scope.metrics.push({
							'value': data.event[i]['@eventName'],
							'name': data.event[i]['@eventName'],
						});
					}
				});
			};

			$scope.getGraph = function (metrics, from, to) {
				if (metrics.length > 0) {
					var metricValues = '';
					for (var i = 0; i < metrics.length; i++) {
						metricValues += metrics[i].value + ',';
					}

					$scope.graph = {
						metrics: metricValues.substr(0, metricValues.length - 1), //remove last comma
						from: from,
						to: to,
						type: 'event'
					};
				}
			};

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
		}
	]);
