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
	.controller('FlurryAppMetricsPageCtrl', ['$scope', 'FlurryFactory', '$translate',
		function ($scope, FlurryFactory, $translate) {
			var _init = function () {
				$scope.pageName = $translate('stats') + ' - Flurry - '  + $translate('appMetrics');
				$scope.metrics = FlurryFactory.getAppMetrics();
			};

			$scope.$on('$translateChangeSuccess', function () {
				$scope.pageName = $translate('stats') + ' - Flurry - '  + $translate('appMetrics');
			});

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
