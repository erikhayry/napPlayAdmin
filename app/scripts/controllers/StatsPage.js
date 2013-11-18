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
  .controller('StatspageCtrl', ['$scope', 'GraphiteFactory', 'FlurryFactory', 'MetricsValue', function ($scope, GraphiteFactory, FlurryFactory, MetricsValue) {
    
    var _init = function(){
    	var _target = MetricsValue.loves;
    	
    	$scope.pageName = 'Stats Page';
    	
    	//$scope.imageSrc = GraphiteFactory.getGraph(_target);
    }

    _init();

  }]);
