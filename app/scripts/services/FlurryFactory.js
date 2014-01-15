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
  .service('FlurryFactory', ['$http', '$q', '$cacheFactory', '$timeout', 'ChartFactory', 'AppConfig', function FlurryFactory($http, $q, $cacheFactory, $timeout, ChartFactory, AppConfig) {
  	var _apiKey = 'BRZXMJS2NRHDNN37CKQM',
        _accessCode = 'ENQZAUFQ5KQ2C24XKT7Z',
        _cache = $cacheFactory('flurry'), //http://docs.angularjs.org/api/ng.$cacheFactory
        _baseUrl = function(metrics){
        	return 'http://api.flurry.com/appMetrics/' + metrics + '?apiAccessCode=' + _accessCode + '&apiKey=' + _apiKey;
        };    
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
       * @param {Array} metrics
       * @param {String} from date in format yyyy-MM-dd
       * @param {String} to date in format yyyy-MM-dd
       * @param {Object=} configure object
       * @returns {HttpPromise} Future object
       */
     
      getGraphData: function(metrics, from, to, configure) {
        console.log("%c \u2764 getGraphData: " + from + " to " + to, "color:pink; background:black; font-size: 14px; padding: 2px 5px;");

        var _deferred = $q.defer(),
            _data = {
              data : [],
              errors : [],
              timedout : []
            },
            //count how many time one or more metrics failed
            _failCount = 0,
            _resolved = false,

            //configure
            _configure = configure || {},
            _retries = _configure.retries || 0,
            _timeout = _configure.timeout || 10000,

            //get the number of metrics handled, both succeeded and failed
            _getDataLength = function(){
              return _data.data.length + _data.errors.length;
            },

            //try to resolve promise
            _resolve = function(retries){
              if(_getDataLength() >= metrics.length) {
                  //resolve if no errors or
                  if(_data.errors.length === 0 || _failCount >= retries){
                    if(!_resolved) _deferred.resolve(_data);
                    _resolved = true; 
                  }
                  else{
                    console.log(_data.errors)
                    _failCount++;
                    _data.errors = [];
                    _data.data = [];
                    _getData();
                  }
              }
            },

            _getIndexIfObjWithOwnAttr = function(array, attr, value) {
                for(var i = 0; i < array.length; i++) {
                    if( array[i].hasOwnProperty(attr) && array[i][attr] === value) {
                        return i;
                    }
                }
                return -1;
            },

            _addData = function(metric, data, type){
              _data.timedout.splice(_data.timedout.indexOf(metric),1);
              if(type === 'error') _data.errors.push(data);
              else _data.data.push(data)
              
            },

            _getData = function(){

              //loop through all metrics
              console.group("_getData");
              console.count("_getData called"); 

              $timeout(function(){
                if(!_resolved) _deferred.resolve({
                  data : _data.data.slice(0),
                  errors : _data.errors.slice(0),
                  timedout : _data.timedout.slice(0)            
                });

                _resolved = true;

              }, _timeout)   
              
              for (var i = 0; i < metrics.length; i++) {
                  var _cacheKey = metrics[i];
                  
                  _data.timedout.push(metrics[i]);

                  (function(index, cacheKey){ 
                    var _cacheData = _cache.get(cacheKey),
                        _indexFrom, _indexTo;

                    if(_cacheData) {
                      _indexFrom = _getIndexIfObjWithOwnAttr(_cacheData.data.day, '@date', from);
                      _indexTo = _getIndexIfObjWithOwnAttr(_cacheData.data.day, '@date', to);
                    }

                    console.group(_cacheKey);
                    console.log(_cacheData)
                    console.log(_indexFrom)
                    console.log(_indexTo)

                    //check if data been cached
                    if(_indexFrom > -1 && _indexTo > -1){
                      console.log('cache: ' + metrics[index])                      
                      _cacheData.data.day = _cacheData.data.day.splice(_indexFrom, _indexTo)
                      _addData(metrics[index], _cacheData.data);
                      _resolve(_retries);                
                    }

                    //if not cached make an http request
                    else{
                      console.log('http: ' + metrics[index])
                      $timeout(function(){
                        $http.get(_baseUrl(metrics[index]) + '&startDate=' + from + '&endDate=' + to)
                        .success(function(data){                    
                          _addData(metrics[index], data)
                          _cache.put(cacheKey, {
                            data : data,
                            from : from,
                            to : to
                          });                    
                          _resolve(_retries);
                        })
                        .error(function(data){
                          _addData(metrics[index], metrics[index], 'error')                                     
                          _resolve(_retries);
                        });                
                      }, 3000 * i); //need a timeout to not call the api too much                
                    }
                    console.groupEnd();
                  })(i, _cacheKey);                
              }; 
              console.groupEnd();              
            };

            _getData();
        
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


