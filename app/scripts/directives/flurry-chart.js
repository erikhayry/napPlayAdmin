'use strict';

/**
* @ngdoc directive
* @name napPlayAdminApp.directive:flurryChart
* @element canvas
* @restrict E
* @function
*
* @description
* desc
*
*
* @example
<doc:example>
  <doc:source>
    <style>
      .m-chart{
        margin-bottom: 20px;
      }

      .m-chart-title{
        margin-bottom: 20px;
      }
    </style>
    <script>
      function Ctrl($scope) {
       $scope.notifications = 'Notifications';
       $scope.stats = 'Stats';
      }
    </script>
    <div class="m-chart">
      <h2 class="m-chart-title">{{title}}</h2>
      <canvas width="700px"></canvas>
    </div>
  </doc:source>
  <doc:scenario>
    it('should initialize to model', function() {
      expect(binding('stats')).toEqual('Stats');
      expect(binding('notifications')).toEqual('Notifications');
    });
  </doc:scenario>
</doc:example>
*/

angular.module('napPlayAdminApp')
  .directive('flurryChart', ['FlurryFactory', function (FlurryFactory) {
    return {
      templateUrl: 'templates/chart.html',
      restrict: 'E',
      replace: 'true',
      scope: {},
      link: function postLink(scope, element, attrs) {
        
        scope.title = 'Flurry: ' + attrs.metrics;
      	
        FlurryFactory.getGraphData({
      		from : attrs.from,
      		to : attrs.to,
      		metrics : attrs.metrics
      	})
      	.then(function(data){
      		  var ctx = element[0].querySelectorAll('canvas')[0].getContext("2d"),
      			myNewChart = new Chart(ctx).Line(FlurryFactory.format(data));
      	});
      }
    }
  }]);