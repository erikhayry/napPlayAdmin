'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Admin Tool
 * - github https://github.com/erikportin/napPlayAdmin
 */

/**
 * @ngdoc object
 * @name napPlayAdminApp
 * @function
 * @requires ngCookies 
 * @requires ngRoute
 * @description
 * Main app configuration
 *
 */

var app = angular.module('napPlayAdminApp', ['ngCookies', 'ngRoute', 'd3'])
  .config(function ($routeProvider, $locationProvider, AppConfig) {
    $locationProvider.html5Mode(!AppConfig.hash)
    
    $routeProvider
      .when('/stats/test', {
        templateUrl: 'views/stats.html',
        controller: 'StatsPageCtrl'
      })
      .when('/user-relationships', {
        templateUrl: 'views/user-relationships.html',
        controller: 'UserRelationshipsPageCtrl'
      })
      .when('/notifications', {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsPageCtrl'
      })            
      .otherwise({
        redirectTo: '/stats/test'
      });
  })

  /*
    config below fixes this http bug
    http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is  
  */

  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });


  /*
    load third party modules
   */
  
  angular.module('d3', []);

