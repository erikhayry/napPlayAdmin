'use strict';
/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Controllers
 */


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
  .controller('StatspageCtrl', ['$scope', 'FlurryFactory', function ($scope, FlurryFactory) {
    
    var _init = function(){    	
    	$scope.pageName = 'Stats Page';    	
    }

    _init();

  }]);
