'use strict';

angular.module('napPlayAdminApp')
	.controller('AppCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$translate', 'AppConfig',
		function ($rootScope, $scope, $location, $routeParams, $translate, AppConfig) {
			$rootScope.hash = AppConfig.hash;

			$scope.$on('$viewContentLoaded', function () {
				var _path = $location.$$path.slice(1);
				$scope.path = _path.slice(0, _path.indexOf('/'));

				$translate.uses($routeParams.lang);
				$rootScope.lang = AppConfig.hash = $routeParams.lang;

				console.groupCollapsed('%c AppCtrl', AppConfig.debugHeading);
				console.log('path: ' + $scope.path);
				console.log('lang: ' + $rootScope.lang);
				console.groupEnd();
			});

		}
	]);
