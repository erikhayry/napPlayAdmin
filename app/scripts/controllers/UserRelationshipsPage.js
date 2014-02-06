'use strict';

angular.module('napPlayAdminApp')
	.controller('UserRelationshipsPageCtrl', ['$scope', '$routeParams',
		function ($scope, $routeParams) {
			$scope.pageName = 'User relationships';
			$scope.userId = $routeParams.userId;
		}
	]);
