'use strict';
/**
 * @ngdoc overview
 * @name index
 * @description
 * NAP Play Controllers
 */


/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryPageCtrl
 * @function
 *
 * @description
 * Flurry page controller
 *
 */

angular.module('napPlayAdminApp')
  .controller('FlurryPageCtrl', ['$scope', 'FlurryFactory', function ($scope, FlurryFactory) {
    var _init = function(){    	    	
    	$scope.pageName = 'Stats - Flurry';     	
    	$scope.metrics = FlurryFactory.getAppMetrics();
    	$scope.isGettingData = "";

        /*
            http://angular-ui.github.io/bootstrap/#/datepicker
        */          

        $scope.today();
        $scope.toggleMax();
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
        $scope.format = 'dd-MMMM-yyyy';
    }

    $scope.getGraph = function(metrics, from, to){
        if(metrics.length > 0){
            var metricValues = '';
            for (var i = 0; i < metrics.length; i++) {
                metricValues += metrics[i].value + ',';
            };

            $scope.graph = {
                metrics : metricValues.substr(0, metricValues.length - 1), //remove last comma
                from : from,
                to : to
            }            
        }
    }

    /*
        date picker functions
     */

    $scope.openFromDropDown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedFrom = true;
    };

    $scope.openToDropDown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedTo = true;
    };

    $scope.today = function() {
        $scope.dateFrom = new Date();
        $scope.dateTo = new Date();
        $scope.dateFrom.setDate($scope.dateFrom.getDate() - 30);
        $scope.dateTo.setDate($scope.dateTo.getDate() - 1);
    };

    $scope.toggleMax = function() {
        $scope.maxDate = ( $scope.maxDate ) ? null : new Date();
    };

    _init();
  }]);