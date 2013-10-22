'use strict';

angular.module('napPlayAdminApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      
      /*
        url for template testing. TODO figure out jhow to disable on live  
      */


      .when('/test/', {
        templateUrl: 'templates/test.html',
        controller: 'templateCtrl'
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
    })