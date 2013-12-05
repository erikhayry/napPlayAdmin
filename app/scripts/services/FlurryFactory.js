'use strict';

/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryFactory
 * @function
 * @requires $http
 * @requires ChartFactory
 * @description
 * Service talking to the {@link http://support.flurry.com/index.php?title=API/Code|The Flurry Metrics Api}
 *
 * 	- ActiveUsers	 			    Total number of unique users who accessed the application per day.
   	- ActiveUsersByWeek	 		Total number of unique users who accessed the application per week. Only returns data for dates which specify at least a complete calendar week.
   	- ActiveUsersByMonth		Total number of unique users who accessed the application per month. Only returns info for dates which specify at least a complete calendar month.
   	- NewUsers	 				    Total number of unique users who used the application for the first time per day.
   	- MedianSessionLength		Median length of a user session per day.
    - AvgSessionLength	 		Average length of a user session per day.
    - Sessions	 				    The total number of times users accessed the application per day.
    - RetainedUsers	 			  Total number of users who remain active users of the application per day.
    - PageViews	 				    Total number of page views per day.
    - AvgPageViewsPerSession	Average page views per session for each day.
 *
 * 
 */

angular.module('napPlayAdminApp')
  .service('FlurryFactory', ['$http', '$q', '$timeout', 'ChartFactory', function FlurryFactory($http, $q, $timeout, ChartFactory) {
  	var _apiKey = 'BRZXMJS2NRHDNN37CKQM',
        _accessCode = 'ENQZAUFQ5KQ2C24XKT7Z',
        _baseUrl = function(metrics){
        	return 'http://api.flurry.com/appMetrics/' + metrics + '?apiAccessCode=' + _accessCode + '&apiKey=' + _apiKey;
        }
  
    return {
      
      /**
       * @ngdoc method
       * @name napPlayAdminApp.FlurryValue#getGraphData
       * 
       * @description
       * Get Flurry data as a json file
       *
       * @param {Object=} metrics, startDate and endDate for Flurry api url
       * @returns {HttpPromise} Future object
       */
     
      getGraphData: function(attrs) {
        var _deferred = $q.defer(),
            _metrics = attrs.metrics,
            _data = [];
        
        for (var i = 0; i < _metrics.length; i++) {
            (function(index){              
              $timeout(function(){
                $http.get(_baseUrl(_metrics[index]) + '&startDate=' + attrs.from + '&endDate=' + attrs.to)
                .success(function(data){
                  _data.push(data);
                  
                  if(_data.length >= _metrics.length) {
                    _deferred.resolve(_data);
                  }

                })
                .error(function(){
                  _deferred.reject('error');
                });                
              }, 3000 * i); //need a timeout to not call the api too much
            })(i);                
        };    

      	return _deferred.promise;
      },

      /**
       * @ngdoc method
       * @name napPlayAdminApp.FlurryValue#getInChartFormat
       *
       * @description
       * Returns flurry data formatted for the Graph library
       *
       * @param {Array} Flurry data
       * @param {string} ChartJS chart type (bar or line)
       *
       * @return {Object} ChartJS data
       */

      getChartJSData: function(data, type){
        var _metrics = [],
            _data = [],
            _days = [],
            _labels = [];

        for (var i = 0; i < data.length; i++) {
          _data = data[i];
          _days = [];
          _labels = [];

          var _nth = Math.ceil(_data.day.length / 20); //show a maximum of;

          for (var j = 0; j < _data.day.length; j++) {
            if(j%_nth == 0){
              _days.push(parseInt(_data.day[j]['@value']));
              _labels.push(_data.day[j]['@date']);         
            }
          };

          _metrics.push({
            days: _days,
            labels: _labels
          });

        };
            
      	return {
          labels : _labels,
          datasets : ChartFactory.getDataSet(_metrics, type)
        };
      }
    }  
  }]);


