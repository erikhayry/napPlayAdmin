'use strict';

/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryFactory
 * @function
 * @requires $http, $q, $cacheFactory, $timeout
 * @requires ChartFactory
 * @description
 * 
 * #AppMetrics
 * Service talking to the {@link http://support.flurry.com/index.php?title=API/Code|The Flurry Metrics Api}
 *
 * 	- ActiveUsers	 			    Total number of unique users who accessed the application per day.
 * 	- ActiveUsersByWeek	 		Total number of unique users who accessed the application per week. Only returns data for dates which specify at least a complete calendar week.
 * 	- ActiveUsersByMonth		Total number of unique users who accessed the application per month. Only returns info for dates which specify at least a complete calendar month.
 * 	- NewUsers	 				    Total number of unique users who used the application for the first time per day.
 * 	- MedianSessionLength		Median length of a user session per day.
 *  - AvgSessionLength	 		Average length of a user session per day.
 *  - Sessions	 				    The total number of times users accessed the application per day.
 *  - RetainedUsers	 			  Total number of users who remain active users of the application per day.
 *  - PageViews	 				    Total number of page views per day.
 *  - AvgPageViewsPerSession	Average page views per session for each day.
 *
 *  Flurry api restrictions:
 *  - Start date cannot be before 2008-01-01
 *  - You can only request a year's worth of data at a time
 *
 * #App info
 * http://api.flurry.com/appInfo/getApplication?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM
 *
 * #Eventinfo
 * Should we include?
 * 
 */

angular.module('napPlayAdminApp')
  .service('FlurryFactory', ['$http', '$q', '$cacheFactory', '$timeout', 'ChartFactory', function FlurryFactory($http, $q, $cacheFactory, $timeout, ChartFactory) {
  	var _apiKey = 'BRZXMJS2NRHDNN37CKQM',
        _accessCode = 'ENQZAUFQ5KQ2C24XKT7Z',
        _cache = $cacheFactory('flurry'), //http://docs.angularjs.org/api/ng.$cacheFactory
        _baseUrl = function(metrics){
        	return 'http://api.flurry.com/appMetrics/' + metrics + '?apiAccessCode=' + _accessCode + '&apiKey=' + _apiKey;
        }

_cache.put("key", "value");
_cache.put("another key", "another value");
console.log(_cache.info());
  
    return {
      /**
       * @name napPlayAdminApp.FlurryFactory#getAppMetrics
       * @methodOf napPlayAdminApp.FlurryFactory
       * 
       * @description
       * Return all available flurry metrics (not sure this is the right way to go)
       *  
       * @return {Array} flurry metrics
       */
      getAppMetrics: function(){
        return [
         {value : 'ActiveUsers', name : 'Active Users'},
         {value : 'ActiveUsersByWeek', name : 'Active Users By Week'},
         {value : 'ActiveUsersByMonth', name : 'Active Users By Month'},
         {value : 'NewUsers', name : 'New Users'},
         {value : 'MedianSessionLength', name : 'Median Session Length'},
         {value : 'AvgSessionLength', name : 'Avg Session Length'},
         {value : 'Sessions', name : 'Sessions'},
         {value : 'RetainedUsers', name : 'Retained Users'},
         {value : 'PageViews', name : 'Page Views'},
         {value : 'AvgPageViewsPerSession', name : 'Avg Page Views Per Session'}
        ]
      },
      
      /**
       * @ngdoc function
       * @name napPlayAdminApp.FlurryFactory#getGraphData
       * @methodOf napPlayAdminApp.FlurryFactory
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
            
        
        //loop through all metrics    
        for (var i = 0; i < _metrics.length; i++) {
            var _cacheKey = _metrics[i] + attrs.from + attrs.to;
            (function(index, cacheKey){ 
              var _cacheData = _cache.get(cacheKey);            
              
              //check if data been cached
              if(_cacheData){
                _data.push(_cacheData)
                if(_data.length >= _metrics.length) {                      
                  _deferred.resolve(_data);
                }
              }

              //if not cached make an http request
              else{
                $timeout(function(){
                  $http.get(_baseUrl(_metrics[index]) + '&startDate=' + attrs.from + '&endDate=' + attrs.to)
                  .success(function(data){
                    _data.push(data);                    
                    if(_data.length >= _metrics.length) {                      
                      _cache.put(_cacheKey, data);
                      _deferred.resolve(_data);
                    }

                  })
                  .error(function(data){
                    console.log(data)
                    _deferred.reject(data);
                  });                
                }, 3000 * i); //need a timeout to not call the api too much                
              }


            })(i, _cacheKey);                
        };    

      	return _deferred.promise;
      },

      /**
       * @ngdoc function
       * @name napPlayAdminApp.FlurryFactory#getInChartFormat
       * @methodOf napPlayAdminApp.FlurryFactory
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


