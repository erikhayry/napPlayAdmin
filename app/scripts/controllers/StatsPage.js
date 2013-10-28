'use strict';

angular.module('napPlayAdminApp')
  .controller('StatspageCtrl', ['$scope', function ($scope) {
    var _init = function(){
    	$scope.pageName = 'Stats Page';
    };

    _init();

  }]);
