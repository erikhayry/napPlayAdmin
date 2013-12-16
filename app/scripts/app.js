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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatspageCtrl'
      })
      
      .otherwise({
        redirectTo: '/stats'
      });
  })

  /*
    config below fixes this http bug
    http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is  
  */

  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });


  angular.module('d3', []);

