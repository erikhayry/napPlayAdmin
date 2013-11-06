'use strict';
/*
  The Graphite Render URL API
  http://graphite.readthedocs.org/en/latest/render_api.html
*/

angular.module('napPlayAdminApp')
  .factory('StatsFactory', ['$http', function($http) {
    // Service logic

    // graphite url
    var _id = '15b47d85',
        _key = '6d3a3e1c-b072-44cf-b879-71f2d9aff58b',
        _baseUrl = 'https://www.hostedgraphite.com/' + _id + '/' + _key + '/graphite/render',
    
    //render-api
        _from = '',
        _until = '',
        _areaAlpha = '',
        _areaMode = '', //none, first, all, stacked,
        _drawNullAsZero = '',

      //dimensions
        _height = '',
        _width = '',

      //colours
        _bgcolor = '',
        _colorList = '',
        _fgcolor = '',

      //text style
        _fontBold = '',
        _fontItalic = '',
        _fontName = '',
        _fontSize = '',  

    /*
      helper functions
    */  
        _get = function(target, format){
          var _format = format || '';
          return $http.get(_baseUrl + '?target=' + target + '&format=' + _format);
        }

    // Public API here
    return {
      getImage: function(target) {
        return _baseUrl + '?target=' + target;
      },
      getJSON: function(target){
        return _get(target, 'json');
      }
    };
  }]);
