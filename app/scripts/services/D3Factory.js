'use strict';

angular.module('d3', [])
  .factory('D3Factory', ['ScriptLoader', function(ScriptLoader) {
      var _getD3 = function(){
            return ScriptLoader.load('scripts/vendor/d3.v3.min.js', 'd3');
          },
          
          _getChart = function(svgEl, data){

          },

          _getDimensions = function(){
            return {
              width: 900 - _getMargins().left - _getMargins().right,
              height: 540 - _getMargins().top - _getMargins().bottom
            };
          },

          _getMargins = function(){
            return {top: 20, right: 30, bottom: 130, left: 40};
          }

      return {
        
        d3: _getD3,
        
        getChart: function(svgEl, data){
          return _getChart(svgEl, data);
        },

        getDimensions: _getDimensions,
        getMargins: _getMargins

      };
}]);