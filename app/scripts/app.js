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

  /*
    config below fixes this http bug
    http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is  
  */

  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

  .directive('appNav', function(){
    return {
      restrict : 'E',
      templateUrl : 'templates/appNav.html',
      replace : true,
    }
  });


