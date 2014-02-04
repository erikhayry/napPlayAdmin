'use strict';

angular.module('napPlayAdminApp')
	.controller('AppCtrl', ['$scope', '$location', '$http', '$window', 'AppConfig',
		function ($scope, $location, $http, $window, AppConfig) {
			
			//url hash
			$scope.hash = AppConfig.hash;

			$scope.$on('$viewContentLoaded', function () {
				var _path = $location.$$path.slice(1);
				$scope.path = _path.slice(0, _path.indexOf('/'));

				console.groupCollapsed('%c AppCtrl', AppConfig.debugHeading);
				console.log('path: ' + $scope.path);
				console.groupEnd();
			});

			//auth
			var url_base64_decode = function (str) {
			  var output = str.replace('-', '+').replace('_', '/');
			  switch (output.length % 4) {
			    case 0:
			      break;
			    case 2:
			      output += '==';
			      break;
			    case 3:
			      output += '=';
			      break;
			    default:
			      throw 'Illegal base64url string!';
			  }
			  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
			}

			$scope.isAuthenticated = true;

			$scope.submit = function () {
				$http
				  .post('/authenticate', $scope.user)
				  .success(function (data, status, headers, config) {
				    $window.sessionStorage.token = data.token;
				    $scope.isAuthenticated = true;
				    var encodedProfile = data.token.split('.')[1];
				    var profile = JSON.parse(url_base64_decode(encodedProfile));
				    $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
				  })
				  .error(function (data, status, headers, config) {
				    // Erase the token if the user fails to log in
				    delete $window.sessionStorage.token;
				    $scope.isAuthenticated = false;

				    // Handle login errors here
				    $scope.error = 'Error: Invalid user or password';
				    $scope.welcome = '';
				  });
			};

			$scope.logout = function () {
				$scope.isAuthenticated = false;
				delete $window.sessionStorage.token;
			};

			$scope.callRestricted = function () {
				$http({url: '/api/restricted', method: 'GET'})
				.success(function (data, status, headers, config) {
				  $scope.message = $scope.message + ' ' + data.name; // Should log 'foo'
				})
				.error(function (data, status, headers, config) {
				  alert(data);
				});
			};

		}
	]);
