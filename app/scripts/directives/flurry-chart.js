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
  .directive('flurryChart', ['FlurryFactory', 'ChartFactory', 'D3Factory', function (FlurryFactory, ChartFactory, D3Factory) {
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
         
          /*
            Using Chart.js
           */  

      		var _context = element[0].querySelectorAll('canvas')[0].getContext("2d"),
              _chart,
              _setChart = function(type){

                switch(type){
                  case 'bar':
                    _chart = new Chart(_context).Bar(FlurryFactory.getChartJSData(data, type));
                    break;

                  default:
                    _chart = new Chart(_context).Line(FlurryFactory.getChartJSData(data, type), ChartFactory.getOptions('line'));
                    break;
                }
              },
              _initChart = function(){
                _setChart(attrs.flurrytype);
              };

          _initChart();
          


          D3Factory.d3().then(function(d3) {
          

          /*
            Using D3.js
           */
          
          var _svgEl = element[0].querySelectorAll('svg')[0];
          
          var _data = data[1].day;
          
          var _margin = D3Factory.getMargins(),
              _width = D3Factory.getDimensions().width,
              _height = D3Factory.getDimensions().height;


          var x = d3.scale.ordinal()
            .rangeRoundBands([0, _width], .1)
            .domain(_data.map(function(d) { return d['@date'];}))

          var y = d3.scale.linear()
              .range([_height, 0])
              .domain([0, d3.max(_data, function(d) { return d['@value']; })]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");



          var chart = d3.select(_svgEl)
              .attr("width", _width + _margin.left + _margin.right)
              .attr("height", _height + _margin.top + _margin.bottom)
              .append("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")")

              chart.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + _height + ")")
                  .call(xAxis)
                  .selectAll('text')
                    .style('text-anchor', 'start')
                    .attr('dx', '20px')
                    .attr('dy', '0')


              chart.append("g")
                  .attr("class", "y axis")
                  .call(yAxis);


          var bar = chart.selectAll(".bar")
              .data(_data)
              .enter().append("rect")
                  .attr("x", function(d) { 
                    return x(d['@date']); 
                  })
                  .attr('class', 'bar')
                  .attr("y", function(d) { return y(d['@value']); })
                  .attr("height", function(d) { return _height - y(d['@value']); })
                  .attr("width", x.rangeBand());



          });

          

      	}, function(error){
          console.log(error)
        });
      }
    }
  }]);