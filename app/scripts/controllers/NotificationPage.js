'use strict';

angular.module('napPlayAdminApp')
  .controller('NotificationpageCtrl', function ($scope, NotificationFactory) {
  	var _init = function(){
  		$scope.test = ['1', '2', '3'];
  		NotificationFactory.getNotification.then(function(data){
  			$scope.notifications = data.data;
  		});
  	}

  	_init();
  });
