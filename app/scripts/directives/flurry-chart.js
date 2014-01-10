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
      scope :{
        flurrymetrics:'@',
        flurryfrom: '@',
        flurryto: '@'  
      },
      link: function postLink(scope, element, attrs) {
        
        // watch the attributes for any changes        
        scope.$watch('flurrymetrics + flurryfrom + flurryto', function() {
          if(attrs.flurrymetrics, attrs.flurryfrom, attrs.flurryto) _drawGraph();
        });

        scope.title = 'Flurry: ' + attrs.flurrymetrics;

        var _drawGraph = function(){
          var _metrics = attrs.flurrymetrics.replace(' ', '').split(',');
          
          FlurryFactory.getGraphData({
            from : attrs.flurryfrom,
            to : attrs.flurryto,
            metrics : _metrics
          })

          .then(function(data){
            D3Factory.d3().then(function(d3) {
            

            /*
              Using D3.js
             */
            
            var _svgEl = element[0].querySelectorAll('svg')[0];

            //delete g eleemnt here
            while (_svgEl.firstChild) {
                //The list is LIVE so it will re-index each call
                _svgEl.removeChild(_svgEl.firstChild);
            };
            
            var svgWidth = 1500,
                svgHeight = 600,
                padding = {'top': 30, 'right': 30, 'bottom': 30, 'left': 60},
                chartWidth = svgWidth - padding.right - padding.left,
                chartHeight = svgHeight - padding.top - padding.bottom;

            var format = d3.time.format("%Y-%m-%d");

            function getStartDay(days){
              return d3.min(days, function(d){return format.parse(d['@date'])}) 
            }

            function getEndDate(days){
              return d3.max(days, function(d){return format.parse(d['@date'])})
            }

            function getMaxVal(days){
              return d3.max(days, function(d){return +d['@value']}) // + converts stringt to int
            }

            var lineFunction = d3.svg.line()
              .x(function(d) { 
                return xScale(format.parse(d['@date'])); 
              })
              .y(function(d) { 
                return yScale(d['@value']); 
              })
              .interpolate("monotone");

            var xScale = d3.time.scale()
                           .domain([
                                    d3.min(data, function(d) {return getStartDay(d.day)}), 
                                    d3.max(data, function(d) {return getEndDate(d.day)})
                                   ])
                        .range([padding.left, chartWidth - padding.right])
                        

            var yScale = d3.scale.linear()
                           .domain([
                                    0, 
                                    d3.max(data, function(d) {return getMaxVal(d.day)})
                                   ])
                        .range([chartHeight - padding.top, padding.bottom]);
                        
            var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient("bottom")
                          .ticks(9)
                          .tickFormat(function(d) { return format(d)});

            var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient("left")
                          .ticks(5); 

            var svg = d3.select("svg")
              .attr("width", svgWidth)
              .attr("height", svgHeight)
              .append('g')
              .attr("class", "m-chart-inner")

            svg.append("g")
                .attr("class", "m-chart-axis-x")
                .attr("transform", "translate(0," + (chartHeight - padding.bottom) + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "m-chart-axis-x")
                .attr("transform", "translate(" + padding.left + ",0)")
                .call(yAxis);

            svg.selectAll(".m-chart-line")
                .data(data)
                .enter()
                .append("path")
                .attr("class", "line-group")
                .attr("d", function(d){
                  return lineFunction(d.day)
                });
            
   
            /**
             * emmet code for below: g.m-chart-dots>(g.m-chart-dot-holder[data-date data-value transform]>circle.m-chart-dot[r]+text.m-chart-dot-label[transform=translate(10,-10)])*x
             */
            svg.selectAll(".m-chart-dots")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "m-chart-dots")
                .selectAll(".m-chart-dot-holder")
                  .data(function(d) { return d.day; })
                  .enter()
                  .append("g")
                  .attr("class", "m-chart-dot-holder")
                  .attr("data-date", function(d){
                    return d['@date']
                  })
                  .attr("data-value", function(d){
                    return d['@value']
                   })
                  .attr("transform", function(d){
                    return "translate(" + xScale(format.parse(d['@date'])) + "," + yScale(d['@value']) + ")";
                  })
                  .append("circle")
                  .attr("class", "m-chart-dot")
                  .attr("r", 5);

            svg.selectAll(".m-chart-dots")
                .selectAll(".m-chart-dot-holder")
                .data(function(d) { return d.day; })
                  .append("text")
                  .attr("class", "m-chart-dot-label")
                  .attr("transform", "translate(10,-10)")
                  .text(function(d){
                    return d['@date'] + ' : ' + d['@value']
                  })


            });
          }, function(error){
            console.log(error.message)
          });          
        }


      }
    }
  }]);