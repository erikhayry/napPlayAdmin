'use strict';

angular.module('napPlayAdminApp')
  .controller('StatspageCtrl', ['$scope', 'StatsFactory', function ($scope, StatsFactory) {
    var _init = function(){
    	var _target = 'consumer_live.1.love.add.anon.ok.count';
    	
    	$scope.pageName = 'Stats Page';
    	
    	$scope.imageSrc = StatsFactory.getImage(_target);
    	
    	StatsFactory.getJSON(_target)
    	.success(function(data){
    		console.log(data)
    	})
    }
    _init();

  }]);
