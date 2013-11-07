'use strict';
/**
 * @ngdoc service
 * @name napPlayAdminApp.StatsFactory
 * @function
 * @requires $http 
 * @requires napPlayAdminApp.RenderValue
 * @description
 * Service talking to the {@link http://graphite.readthedocs.org/en/latest/render_api.html|The Graphite Render URL API}
 *
 */

angular.module('napPlayAdminApp')
  .factory('StatsFactory', ['$http', 'RenderValue', function($http, RenderValue) {

    var _id = '15b47d85',
        _key = '6d3a3e1c-b072-44cf-b879-71f2d9aff58b',
        _baseUrl = 'https://www.hostedgraphite.com/' + _id + '/' + _key + '/graphite/render',
   
        /**
         * Returning the render values in the correct Render URL API format
         * @return {string} - Render api parameters
         */
        _render = function(){
          var _renderQuery = '';
          
          for(var key in RenderValue){           
            if(RenderValue[key]){
              _renderQuery += '&' + key + '=' + RenderValue[key];
            }
          }

          return _renderQuery;
        }

    return {
      /**
       * @ngdoc method
       * @name napPlayAdminApp.StatsFactory#getGraph
       * @methodOf napPlayAdminApp.StatsFactory
       *
       * @description
       * Returns graph image
       *
       * @param {string} target The target parameter specifies a path identifying one or more metrics
       *
       * @return {string} Image url to graph
       */
      getGraph: function(target) {
        return _baseUrl + '?target=' + target + _render();
      }
    };
  }]);
