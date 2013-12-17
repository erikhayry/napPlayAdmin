'use strict';
/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Controllers
 */


/**
 * @ngdoc service
 * @name napPlayAdminApp.StatsPageCtrl
 * @function
 *
 * @description
 * Stats page controller
 *
 */

angular.module('napPlayAdminApp')
  .controller('StatsPageCtrl', ['$scope', 'FlurryFactory', function ($scope, FlurryFactory) {
    
    var _init = function(){    	
    	$scope.pageName = 'Stats Page';    	
    }

    _init();

  }]);
