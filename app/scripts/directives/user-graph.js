'use strict';

angular.module('napPlayAdminApp')
	.directive('userGraph', function (UserFactory) {
		return {
			templateUrl: 'templates/userGraph.html',
			replace: 'true',
			restrict: 'E',
			scope: {
				userId: '@',
				hash: '='
			},
			link: function postLink(scope, element, attrs) {
				scope.status = '';

				// watch the attributes for any changes        
				attrs.$observe('userId', function (userId) {
					scope.userId = userId;

					UserFactory.getSubGraph(userId)
						.success(function (peopleData) {
							scope.followers = peopleData.nodes;
						});
				});
			}
		};
	});
