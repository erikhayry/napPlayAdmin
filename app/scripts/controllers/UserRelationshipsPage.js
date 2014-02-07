'use strict';

angular.module('napPlayAdminApp')
	.controller('UserRelationshipsPageCtrl', ['$scope', '$routeParams', '$translate',
		function ($scope, $routeParams, $translate) {
			$scope.pageName = $translate('userRelationships');
			$scope.userId = $routeParams.userId;
		}
	]);
