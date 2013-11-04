'use strict';

angular.module('napPlayAdminApp')
  .controller('NotificationpageCtrl', ['$scope', 'NotificationFactory', function ($scope, NotificationFactory) {
  	var _init = function(){
      $scope.pageName = 'Notification Page';
  		
      $scope.status = '';
  		
      NotificationFactory.getNotification().success(function(data){
  			$scope.notifications = data;
  		});

  	};

    $scope.getData = function(){
      $scope.status = 'getting data';
      
      NotificationFactory.getNotification().success(function(data){
        $scope.notifications = data;
        $scope.status = '';
      }).error(function() {
        $scope.status = 'ERROR!';
      });  
    }	

  	_init();

  }]);
