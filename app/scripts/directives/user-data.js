'use strict';

angular.module('napPlayAdminApp')
	.directive('userData', function (UserFactory) {
		return {
			templateUrl: 'templates/userData.html',
			replace: 'true',
			restrict: 'E',
			scope: {
				status: '@'
			},
			link: function postLink(scope, element, attrs) {
				scope.status = 'is-loading';

				scope.getLoves = function (userId) {
					UserFactory.getUserLoves(userId)
						.success(function (loves) {
							scope.loves = loves;
						});
				};

				scope.getAdmirers = function (userId) {
					UserFactory.getUserAdmirers(userId)
						.success(function (admirers) {
							scope.admirers = admirers;
						});
				};

				scope.getAdmirees = function (userId) {
					UserFactory.getUserAdmirees(userId)
						.success(function (admirees) {
							scope.admirees = admirees;
						});
				};

				attrs.$observe('userId', function (userId) {
					UserFactory.getUserData(userId)
						.success(function (userData) {
							scope.name = userData.name;
							scope.id = userData.id;
							scope.username = userData.username;
							scope.avatar = userData.avatar;
							scope.bio = userData.bio;
							scope.canChangeUsername = userData.canChangeUsername;
							scope.countOfAdmirees = userData.countOfAdmirees;
							scope.countOfAdmirers = userData.countOfAdmirers;
							scope.countOfLoves = userData.countOfLoves;
							scope.status = 'is-loaded';
						});
				});
			}
		};
	});
