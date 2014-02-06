'use strict';

angular.module('napPlayAdminApp')
	.controller('AppCtrl', ['$rootScope', '$scope', '$location', 'AppConfig',
		function ($rootScope, $scope, $location, AppConfig) {
			$rootScope.hash = AppConfig.hash;

			$scope.$on('$viewContentLoaded', function () {
				var _path = $location.$$path.slice(1);
				$scope.path = _path.slice(0, _path.indexOf('/'));

				console.groupCollapsed('%c AppCtrl', AppConfig.debugHeading);
				console.log('path: ' + $scope.path);
				console.groupEnd();
			});

		}
	]);
