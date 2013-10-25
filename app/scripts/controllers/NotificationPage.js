'use strict';

angular.module('napPlayAdminApp')
  .controller('NotificationpageCtrl', function ($scope, NotificationFactory) {
  	var _init = function(){

  		$scope.status = 'test'
  		NotificationFactory.getNotification.then(function(data){
  			_gotData();
  			$scope.notifications = data.data;
  		});

  	},

  	_gotData = function(){
  		$scope.status = 'tets'
  	}	

  	_init();

  });
