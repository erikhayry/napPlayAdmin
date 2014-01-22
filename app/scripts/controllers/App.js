'use strict';

angular.module('napPlayAdminApp')
	.controller('AppCtrl', ['$scope', '$location', 'AppConfig',
		function ($scope, $location, AppConfig) {
			$scope.hash = AppConfig.hash;

			$scope.$on('$viewContentLoaded', function () {
				var _path = $location.$$path.slice(1);
				$scope.path = _path.slice(0, _path.indexOf('/'));

				console.groupCollapsed('%c AppCtrl', AppConfig.debugHeading);
				console.log('path: ' + $scope.path);
				console.groupEnd();
			});

		}
	]);
