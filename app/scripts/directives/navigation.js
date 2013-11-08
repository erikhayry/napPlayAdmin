'use strict';
/**
* @ngdoc directive
* @name napPlayAdminApp.directive:navigation
* @element div
* @restrict E
* @function
*
* @description
* Displays the apps main nav
*
*
* @example
<doc:example>
  <doc:source>
    <style>
      .m-app-nav{
        overflow: hidden;
      }
      .m-app-nav-item{
        float: left;
      }
    </style>
    <script>
      function Ctrl($scope) {
       $scope.notifications = 'Notifications';
       $scope.stats = 'Stats';
      }
    </script>
    <ul class="m-app-nav" ng-controller="Ctrl">
      <li class="m-app-nav-item"><a id="notifications-page-link" href="#/notifications">{{notifications}}</a></li>
      <li class="m-app-nav-item"><a id="stats-page-link" href="#/stats">{{stats}}</a></li>
    </ul>
  </doc:source>
  <doc:scenario>
    it('should initialize to model', function() {
      expect(binding('stats')).toEqual('Stats');
      expect(binding('notifications')).toEqual('Notifications');
    });
  </doc:scenario>
</doc:example>
*/
angular.module('napPlayAdminApp')
  .directive('navigation', function () {
	return {
	      restrict : 'E',
	      templateUrl : 'templates/appNav.html',
	      replace : true,
	    }
  });
