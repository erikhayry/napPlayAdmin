'use strict';
/**
 * @ngdoc service
 * @name napPlayAdminApp.StatspageCtrl
 * @function
 *
 * @description
 * Stats page controller
 *
 */

angular.module('napPlayAdminApp')
  .controller('StatspageCtrl', ['$scope', 'StatsFactory', 'MetricsValue', function ($scope, StatsFactory, MetricsValue) {
    
    var _init = function(){
    	var _target = MetricsValue.loves;
    	
    	$scope.pageName = 'Stats Page';
    	
    	$scope.imageSrc = StatsFactory.getGraph(_target);
    }

    _init();

  }]);
