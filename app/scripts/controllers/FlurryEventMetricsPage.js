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

				var _from = new Date();
				var _to = new Date();
				_to.setDate(_to.getDate() - 1);
				_from.setDate(_from.getDate() - 30);

				$scope.getMetrics($filter('date')(_from, 'yyyy-MM-dd'), $filter('date')(_to, 'yyyy-MM-dd'));
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

			_init();
		}
	]);
