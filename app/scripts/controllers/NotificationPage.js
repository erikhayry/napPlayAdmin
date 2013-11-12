'use strict';
/**
 * @ngdoc overview
 * @name index
 * @description
 * This is the overview for controllers
 */


/**
 * @ngdoc service
 * @name napPlayAdminApp.NotificationpageCtrl
 * @function
 *
 * @description
 * Notification page controller
 *
 */

angular.module('napPlayAdminApp')
  .controller('NotificationpageCtrl', ['$scope', 'NotificationFactory', function ($scope, NotificationFactory) {
  	
    var _init = function(){
      $scope.pageName = 'Notification Page';
  		
      $scope.status = '';
  		
      NotificationFactory.getNotification()
      .success(function(data){
        $scope.notifications = data;
        $scope.status = '';
      })

      .error(function() {
        $scope.status = 'ERROR!';
      })

      .then(function(notification){
        console.log(notification)
      })
  	};

    /**
     * @ngdoc method
     * @name napPlayAdminApp.NotificationpageCtrl#$scope.getData
     * @methodOf napPlayAdminApp.NotificationpageCtrl
     *
     * @description
     * Gets data
     *
     */
    $scope.getData = function(){
      $scope.status = 'getting data';
      
      NotificationFactory.getNotification()

      .success(function(data){
        $scope.notifications = data;
        $scope.status = '';
      })

      .error(function() {
        $scope.status = 'ERROR!';
      });

    }	

  	_init();

  }]);
