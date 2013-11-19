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
        scope.title = 'Flurry: ' + attrs.flurrymetrics;

        var _metrics = attrs.flurrymetrics.replace(' ', '').split(',');
      	
        FlurryFactory.getGraphData({
      		from : attrs.flurryfrom,
      		to : attrs.flurryto,
      		metrics : _metrics
      	})

      	.then(function(data){
      		var _context = element[0].querySelectorAll('canvas')[0].getContext("2d"),
              _chart,
              _setChart = function(type){
                switch(type){
                  case 'bar':
                    _chart = new Chart(_context).Bar(FlurryFactory.getChartJSData(data, type));
                    break;

                  default:
                    _chart = new Chart(_context).Line(FlurryFactory.getChartJSData(data, type));
                    break;
                }
              },
              _initChart = function(){
                _setChart(attrs.flurrytype);
              };

          _initChart();

      	}, function(error){
          console.log(error)
        });
      }
    }
  }]);