'use strict';
/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Controllers
 */

/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryAppMetricsPageCtrl
 * @function
 *
 * @description
 * Flurry page controller
 *
 */

angular.module('napPlayAdminApp')
	.controller('FlurryAppMetricsPageCtrl', ['$scope', 'FlurryFactory',
		function ($scope, FlurryFactory) {
			var _init = function () {
				$scope.pageName = 'Stats - Flurry - App metrics';
				$scope.metrics = FlurryFactory.getAppMetrics();
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
						type: 'app'
					};
				}
			};

			_init();
		}
	]);
