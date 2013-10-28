'use strict';
var $routeProviderReference;

var app = angular.module('napPlayAdminApp', ['ngCookies'])
  .config(function ($routeProvider) {
    $routeProviderReference = $routeProvider;
    $routeProvider
      .when('/notifications', {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationpageCtrl'
      })

      .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatspageCtrl'
      })
      
      .otherwise({
        redirectTo: '/notifications'
      });
  })

  .directive('appNav', function(){
    return {
      restrict : 'E',
      templateUrl : 'templates/appNav.html',
      replace : true,
    }
  });


