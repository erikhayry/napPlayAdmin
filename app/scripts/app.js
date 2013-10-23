'use strict';
var $routeProviderReference;

var app = angular.module('napPlayAdminApp', ['ngCookies'])
  .config(function ($routeProvider) {
    $routeProviderReference = $routeProvider;
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  })

  .directive('test', function(){
      return {
        restrict : 'E',
        templateUrl : 'templates/test.html',
        replace : true
      }
    });


