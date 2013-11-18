'use strict';

/**
* @ngdoc directive
* @name napPlayAdminApp.directive:graphiteChart
* @element img
* @restrict E
* @function
*
* @description
* Displays the apps main nav
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
  .directive('graphiteChart', ['GraphiteFactory', function (GraphiteFactory) {
    return {
      templateUrl: 'templates/chart.html',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function postLink(scope, element, attrs) {
        
        scope.title = 'Graphite: ' + attrs.npaTarget
        
        GraphiteFactory.getGraphData(attrs.npaTarget)
        .then(function(data){
          var ctx = element[0].querySelectorAll('canvas')[0].getContext("2d");
          ctx.fillText("Loading", 248, 43);
          new Chart(ctx).Line(GraphiteFactory.format(data));
        });
      }
    };
  }]);
