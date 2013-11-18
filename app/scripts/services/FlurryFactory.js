'use strict';

/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryFactory
 * @function
 * @requires $http 
 * @requires napPlayAdminApp.FlurryValue
 * @description
 * Service talking to the {@link http://support.flurry.com/index.php?title=API/Code|The Flurry Metrics Api}
 *
 * 	- ActiveUsers	 			Total number of unique users who accessed the application per day.
   	- ActiveUsersByWeek	 		Total number of unique users who accessed the application per week. Only returns data for dates which specify at least a complete calendar week.
   	- ActiveUsersByMonth		Total number of unique users who accessed the application per month. Only returns info for dates which specify at least a complete calendar month.
   	- NewUsers	 				Total number of unique users who used the application for the first time per day.
   	- MedianSessionLength		Median length of a user session per day.
	- AvgSessionLength	 		Average length of a user session per day.
	- Sessions	 				The total number of times users accessed the application per day.
	- RetainedUsers	 			Total number of users who remain active users of the application per day.
	- PageViews	 				Total number of page views per day.
	- AvgPageViewsPerSession	Average page views per session for each day.
 *
 * 
 */

angular.module('napPlayAdminApp')
  .service('FlurryFactory', ['$http', 'FlurryValue', function FlurryFactory($http, FlurryValue) {
  	var _apiKey = 'BRZXMJS2NRHDNN37CKQM',
        _accessCode = 'ENQZAUFQ5KQ2C24XKT7Z',
        _baseUrl = function(metrics){
        	return 'http://api.flurry.com/appMetrics/' + metrics + '?apiAccessCode=' + _accessCode + '&apiKey=' + _apiKey;
        }
  
    return {
      
      /**
       * @ngdoc method
       * @name napPlayAdminApp.FlurryValue#getGraphData
       * @methodOf napPlayAdminApp.flurryValue
       *
       * @description
       * Returns graph image
       *
       * @param {string} target The target parameter specifies a path identifying one or more metrics
       *
       * @return {string} Image url to graph
       */
     
      getGraphData: function(attrs) {
      	return $http.get(_baseUrl(attrs.metrics) + '&startDate=' + attrs.from + '&endDate=' + attrs.to);
      },

      format: function(data){
      	var data = data.data,
      		days = [],
      		labels = [],
          nth = Math.floor(data.day.length / 20);
          console.log(nth)

      	for (var i = 0; i < data.day.length; i++) {
          if(i%nth == 0){
            days.push(parseInt(data.day[i]['@value']));
            labels.push(data.day[i]['@value'] + '/' + i );         
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


