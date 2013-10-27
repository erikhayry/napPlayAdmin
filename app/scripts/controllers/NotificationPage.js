'use strict';

angular.module('napPlayAdminApp')
  .controller('NotificationpageCtrl', function ($scope, NotificationFactory) {
  	var _init = function(){

  		$scope.status = 'test'
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

  });
