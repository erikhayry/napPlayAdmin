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
        scope.status = '';

        // watch the attributes for any changes        
        scope.$watch('flurrymetrics + flurryfrom + flurryto', function() {
          if(attrs.flurrymetrics, attrs.flurryfrom, attrs.flurryto) _drawGraph();
        });

        scope.title = 'Flurry: ' + attrs.flurrymetrics;

        var _drawGraph = function(){
          scope.status = 'is-loading';
          var _metrics = attrs.flurrymetrics.replace(' ', '').split(',');

          FlurryFactory.getGraphData({
            from : attrs.flurryfrom,
            to : attrs.flurryto,
            metrics : _metrics
          })

          .then(function(data){
            D3Factory.d3().then(function(d3) {
            

            /*
              D3.js
             */
            
            var _svgEl = element[0].querySelectorAll('svg')[0];

            //delete any previous chart
            while (_svgEl.firstChild) {
                _svgEl.removeChild(_svgEl.firstChild);
            };

            /*
              chart variables
             */
            
            var _svgWidth = 1500,
                _svgHeight = 600,
                _padding = {'top': 60, 'right': 30, 'bottom': 30, 'left': 60},
                _chartWidth = _svgWidth - _padding.right - _padding.left,
                _chartHeight = _svgHeight - _padding.top - _padding.bottom;

            /*
              helper function
             */

            var _format = d3.time.format("%Y-%m-%d"),
                
                _getStartDay = function(days){
                  return d3.min(days, function(d){return _format.parse(d['@date'])}) 
                },
                
                _getEndDate = function(days){
                  return d3.max(days, function(d){return _format.parse(d['@date'])})
                },

                _getMaxVal = function(days){
                  return d3.max(days, function(d){return +d['@value']}) // + converts stringt to int
                },

                _lineFunction = d3.svg.line()
                  .x(function(d) { 
                    return _xScale(_format.parse(d['@date'])); 
                  })
                  .y(function(d) { 
                    return _yScale(d['@value']); 
                  })
                  .interpolate("monotone"),

                _xScale = d3.time.scale()
                  .domain([
                            d3.min(data, function(d) {return _getStartDay(d.day)}), 
                            d3.max(data, function(d) {return _getEndDate(d.day)})
                           ])
                  .range([_padding.left, _chartWidth - _padding.right]),

                _yScale = d3.scale.linear()
                  .domain([
                          0, 
                          d3.max(data, function(d) {return _getMaxVal(d.day)})
                         ])
                  .range([_chartHeight - _padding.bottom, _padding.top]),
                        
                _xAxis = d3.svg.axis()
                          .scale(_xScale)
                          .orient("bottom")
                          .ticks(9)
                          .tickFormat(function(d) { return _format(d)}),

                _yAxis = d3.svg.axis()
                          .scale(_yScale)
                          .orient("left")
                          .ticks(5); 
            /*
              build the chart
             */              
                          
            var _svg = d3.select("svg")
                .attr("width", _svgWidth)
                .attr("height", _svgHeight)
                .append('g')
                  .attr("class", "m-chart-inner")

            //add x and y axis        
            _svg.append("g")
                .attr("class", "m-chart-axis-x")
                .attr("transform", "translate(0," + (_chartHeight - _padding.bottom) + ")")
                .call(_xAxis)
                .selectAll("text")  
                  .style("text-anchor", "end")
                  .attr("dx", "-.8em")
                  .attr("dy", ".15em")
                  .attr("transform", function(d) {
                    return "rotate(-65)" 
                  });

            _svg.append("g")
                .attr("class", "m-chart-axis-x")
                .attr("transform", "translate(" + _padding.left + ",0)")
                .call(_yAxis);

            //add label
            _svg.append("text")
              .attr("class", "m-chart-labels")
              .attr("transform", "translate(0," + (_padding.top / 2) + ")")
              .selectAll(".m-chart-label")
              .data(data)
              .enter()
              .append("tspan")
                .attr("class", function(d, i){
                  return "m-chart-label m-chart-label-" + (i + 1); // add one to make it easier to use in sass which loops from index 1
                })
                .text(function(d){
                  return d["@metric"] + ' '; 
                })  

            //add lines                    
            _svg.selectAll(".m-chart-line")
                .data(data)
                .enter()
                .append("path")
                  .attr("class", function(d, i){
                    return "m-chart-line m-chart-line-" + (i + 1); // add one to make it easier to use in sass which loops from index 1
                  })
                  .attr("d", function(d){
                    return _lineFunction(d.day)
                  });
            
            /**
             * emmet code for below: g.m-chart-dots>(g.m-chart-dot-holder[data-date data-value transform]>circle.m-chart-dot[r]+text.m-chart-dot-label[transform=translate(10,-10)])*x
             */
            
            //add dots
            _svg.selectAll(".m-chart-dots")
                .data(data)
                .enter()
                .append("g")
                .attr("class", function(d, i){
                    return "m-chart-dots m-chart-dots-" + (i + 1); // add one to make it easier to use in sass which loops from index 1
                  })
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
                      return "translate(" + _xScale(_format.parse(d['@date'])) + "," + _yScale(d['@value']) + ")";
                    })
                    .append("circle")
                      .attr("class", "m-chart-dot")
                      .attr("r", 5);

            //add dot label            
            _svg.selectAll(".m-chart-dots")
                .selectAll(".m-chart-dot-holder")
                .data(function(d) { return d.day; })
                .append("text")
                  .attr("class", "m-chart-dot-label")
                  .attr("transform", "translate(10,-10)")
                  .text(function(d){
                    return d['@date'] + ' : ' + d['@value']
                  })
            });
            
            scope.status = 'is-loaded';

          }, function(error){
            console.log(error.message)
          });          
        }


      }
    }
  }]);