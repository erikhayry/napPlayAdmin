'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 * This is the overview for services
 */

/**
 * @ngdoc service
 * @name napPlayAdminApp.GraphiteFactory
 * @function
 * @requires $http 
 * @requires napPlayAdminApp.GraphiteValue
 * @description
 * Service talking to the {@link http://graphite.readthedocs.org/en/latest/render_api.html|The Graphite Render URL API}
 *
 */

angular.module('napPlayAdminApp')
  .factory('GraphiteFactory', ['$http', 'GraphiteValue', function($http, GraphiteValue) {

    var _id = '15b47d85',
        _key = '6d3a3e1c-b072-44cf-b879-71f2d9aff58b',
        _baseUrl = 'https://www.hostedgraphite.com/' + _id + '/' + _key + '/graphite/render',
   
        /**
         * Returning the render values in the correct Render URL API format
         * @return {string} - Render api parameters
         */
        
        _render = function(){
          var _renderQuery = '';
          
          for(var key in GraphiteValue){           
            if(GraphiteValue[key]){
              _renderQuery += '&' + key + '=' + GraphiteValue[key];
            }
          }

          return _renderQuery;
        }

    return {
      
      /**
       * @ngdoc method
       * @name napPlayAdminApp.GraphiteFactory#getGraph
       * @methodOf napPlayAdminApp.GraphiteFactory
       *
       * @description
       * Returns graph image
       *
       * @param {string} target The target parameter specifies a path identifying one or more metrics
       *
       * @return {string} Image url to graph
       */
     
      getGraphImage: function(target) {
        return _baseUrl + '?target=' + target + _render();
      },

      getGraphData: function(target){
        return $http.get(_baseUrl + '?target=' + target + '&format=json');
      },

      format: function(data){
        var data = data.data[0],
            days = [],
            labels = [],
            nth = Math.ceil(data.datapoints.length / 20);

        for (var i = 0; i < data.datapoints.length; i++) {
          if(i%nth == 0){
            days.push(parseInt(data.datapoints[i][0]));
            labels.push(data.datapoints[i][1]);            
          }

        };
        
        return {
          labels : labels,
          datasets : [
            {
              fillColor : "rgba(220,220,220,0.5)",
              strokeColor : "rgba(220,220,220,1)",
              pointColor : "rgba(220,220,220,1)",
              pointStrokeColor : "#000",
              data : days
            }
          ]
         }

      }   
    }
  }]);
