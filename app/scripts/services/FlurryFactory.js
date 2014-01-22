'use strict';

/**
 * @ngdoc service
 * @name napPlayAdminApp.FlurryFactory
 * @function
 * @requires $http
 * @requires $q
 * @requires $cacheFactory
 * @requires $timeout
 * @description
 * 
 * ## AppMetrics
 * 
 * Service talking to the [The Flurry Metrics Api](http://support.flurry.com/index.php?title=API/Code)
 * ### Metrics
 * <table>
    <tr>
        <th>metric</th>
        <th>description</th>
    </tr>
    <tr>
      <td>ActiveUsers</td>
      <td>Total number of unique users who accessed the application per day.</td>
    </tr>
    <tr>
      <td>ActiveUsersByWeek</td>
      <td>Total number of unique users who accessed the application per week. Only returns data for dates which specify at least a complete calendar week.</td>
    </tr>
    <tr>
      <td>ActiveUsersByMonth</td>
      <td>Total number of unique users who accessed the application per month. Only returns info for dates which specify at least a complete calendar month.</td>
    </tr>
    <tr>
      <td>NewUsers Total number</td>
      <td>of unique users who used the application for the first time per day.</td>
    </tr>
    <tr>
      <td>MedianSessionLength</td>
      <td>Median length of a user session per day.</td>
    </tr>
    <tr>
      <td>AvgSessionLength</td>
      <td>Average length of a user session per day.</td>
    </tr>
    <tr>
      <td>Sessions</td>
      <td>The total number of times users accessed the application per day.</td>
    </tr>
    <tr>
      <td>RetainedUsers</td>
      <td>Total number of users who remain active users of the application per day.</td>
    </tr>
    <tr>
      <td>PageViews</td>
      <td>Total number of page views per day.</td>
    </tr>
    <tr>
      <td>AvgPageViewsPerSession</td>
      <td>Average page views per session for each day.</td>
    </tr>
   </table>
 *
 *  ### Flurry api restrictions:
 *  - Start date cannot be before 2008-01-01
 *  - You can only request a year's worth of data at a time
 *
 * ## App info
 * App info api [docs](http://api.flurry.com/appInfo/getApplication?apiAccessCode=ENQZAUFQ5KQ2C24XKT7Z&apiKey=BRZXMJS2NRHDNN37CKQM)
 *
 * ## Eventinfo
 * Should we include?
 * 
 */

angular.module('napPlayAdminApp')
	.service('FlurryFactory', ['$http', '$q', '$cacheFactory', '$timeout', 'AppConfig',
		function FlurryFactory($http, $q, $cacheFactory, $timeout, AppConfig) {
			var _apiKey = 'BRZXMJS2NRHDNN37CKQM',
				_accessCode = 'ENQZAUFQ5KQ2C24XKT7Z',
				_cache = $cacheFactory('flurry'), //http://docs.angularjs.org/api/ng.$cacheFactory
				_baseUrl = function (metrics) {
					return 'http://api.flurry.com/appMetrics/' + metrics + '?apiAccessCode=' + _accessCode + '&apiKey=' + _apiKey;
				};
			return {
				/**
				 * @ngdoc function
				 * @name napPlayAdminApp.FlurryFactory#getAppMetrics
				 * @methodOf napPlayAdminApp.FlurryFactory
				 *
				 * @description
				 * Return all available flurry metrics
				 *
				 * @return {Array} metrics Array of flurry metrics formatted {value: 'VALUE', name : 'NAME'}
				 */
				getAppMetrics: function () {
					return [{
						value: 'ActiveUsers',
						name: 'Active Users'
					}, {
						value: 'ActiveUsersByWeek',
						name: 'Active Users By Week'
					}, {
						value: 'ActiveUsersByMonth',
						name: 'Active Users By Month'
					}, {
						value: 'NewUsers',
						name: 'New Users'
					}, {
						value: 'MedianSessionLength',
						name: 'Median Session Length'
					}, {
						value: 'AvgSessionLength',
						name: 'Avg Session Length'
					}, {
						value: 'Sessions',
						name: 'Sessions'
					}, {
						value: 'RetainedUsers',
						name: 'Retained Users'
					}, {
						value: 'PageViews',
						name: 'Page Views'
					}, {
						value: 'AvgPageViewsPerSession',
						name: 'Avg Page Views Per Session'
					}];
				},

				/**
				 * @ngdoc function
				 * @name napPlayAdminApp.FlurryFactory#getGraphData
				 * @methodOf napPlayAdminApp.FlurryFactory
				 *
				 * @description
				 * Get Flurry data
				 *
				 * ##Configure
				 * - retries : number of times function should try to get failed metrics. Default value is 0.
				 * - timeout : max of time (in milliseconds) until giving up trying to get data. Timeout is superior to retries. Default value is 10000.
				 *
				 * @param {Array} metrics Array of metric ids
				 * @param {String} from From date value in format yyyy-MM-dd
				 * @param {String} to To date value in format yyyy-MM-dd
				 * @param {Object=} configure Configure object
				 * @returns {HttpPromise} Object containing arrays of data, failed metrics and timedout metrics. Format {data : [], timedout : [], errors : []}
				 */

				getGraphData: function (metrics, from, to, configure) {
					console.groupCollapsed('%c getGraphData: ' + from + ' to ' + to + ' for ' + metrics, AppConfig.debugHeading);

					var _deferred = $q.defer(),

						//return data object
						_data = {
							data: [],
							errors: [],
							timedout: []
						},

						//count how many time one or more metrics failed
						_failCount = 0,

						//has the promise been resolved
						_resolved = false,

						//configure
						_configure = configure || {},
						_retries = _configure.retries || 0,
						_timeout = _configure.timeout || 10000,

						//get the number of metrics handled, both succeeded and failed
						_getDataLength = function () {
							return _data.data.length + _data.errors.length;
						},

						//try to resolve promise
						_resolve = function (timedout, retries) {
							if (_resolved) return false;

							if (timedout) {
								var _clonedData = {
									//slice(0) to make a clone of current data
									data: _data.data.slice(0),
									errors: _data.errors.slice(0),
									timedout: _data.timedout.slice(0)
								};

								_deferred.resolve(_clonedData);
								_resolved = true;

								console.group('resolved');
								console.log('reason: timedout');
								console.table(_data);
								console.groupEnd();
								console.groupEnd();
							}

							//if all metrics been handled
							else if (_getDataLength() >= metrics.length) {

								//resolve if no errors or we reached maximum retries
								if (_data.errors.length === 0 || _failCount >= retries) {
									if (!_resolved) _deferred.resolve(_data);
									_resolved = true;

									console.group('resolved');
									console.log('failCount: ' + _failCount);
									console.table(_data);
									console.groupEnd();
									console.groupEnd();

								}
								//else keep trying to get data
								else {
									_failCount++;

									console.group('failed');
									console.log('failCount: ' + _failCount);
									console.log('errors: ' + _data.errors.length);
									console.table('reason: still got retries or errors');
									console.groupEnd();

									//empty all data arrays, as succesful metrics are beeing cached there wont be unnecessary http calls 
									_data.errors = [];
									_data.data = [];

									_getData();
								}
							}
						},

						// return index of object in array by checking the value of a key
						_getIndexIfObjWithOwnAttr = function (array, attr, value) {
							for (var i = 0; i < array.length; i++) {
								if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
									return i;
								}
							}
							return -1;
						},

						// add data to either metric or error array
						_addData = function (metric, data, type) {
							_data.timedout.splice(_data.timedout.indexOf(metric), 1); //remove from timedout array

							console.group('got data for ' + metric);
							console.log('type: ' + type);
							console.log('data length: ' + data.length);
							console.groupEnd();

							if (type === 'error') _data.errors.push(data);
							else _data.data.push(data);
						},

						// get data from api or cache
						_getData = function () {
							console.group('_getData');

							// timeout checking if maxium time is reached
							$timeout(function () {
								_resolve(true);
							}, _timeout);

							//get data for each metric
							for (var i = 0; i < metrics.length; i++) {
								var _cacheKey = metrics[i];

								//initially add metric to timedout array. Moved to error or data array later depending on result
								_data.timedout.push(metrics[i]);

								//anonymous self calling function to be able to loop async  
								(function (index, cacheKey) {
									var _cacheData = _cache.get(cacheKey),
										_indexFrom, _indexTo;

									//if there is cached data for metric check if it is covering our current dates   
									if (_cacheData) {
										_indexFrom = _getIndexIfObjWithOwnAttr(_cacheData.data.day, '@date', from);
										_indexTo = _getIndexIfObjWithOwnAttr(_cacheData.data.day, '@date', to);
									}

									console.group(_cacheKey);
									console.log('from: ' + from + ' : index ' + _indexFrom);
									console.log('from: ' + to + ' : index ' + _indexTo);
									console.log(_cacheData);

									//if cached data covering our current dates use it
									if (_indexFrom > -1 && _indexTo > -1) {
										_addData(metrics[index], {
											'@endDate': _cacheData.data['@endDate'],
											'@generatedDate': _cacheData.data['@generatedDate'],
											'@metric': _cacheData.data['@metric'],
											'@startDate': _cacheData.data['@startDate'],
											'@version': _cacheData.data['@version'],
											'day': _cacheData.data.day.slice(_indexFrom, _indexTo)
										});
										_resolve(_retries);
									}

									//if not cached make an http request
									else {

										console.log('not cached');

										$timeout(function () {
											$http.get(_baseUrl(metrics[index]) + '&startDate=' + from + '&endDate=' + to)

											.success(function (data) {
												_addData(metrics[index], data, 'success');
												console.log('Adding to cache:');
												console.log(data);
												//add to cache
												_cache.put(cacheKey, {
													data: data,
													from: from,
													to: to
												});

												_resolve(_retries);
											})

											.error(function () {
												_addData(metrics[index], metrics[index], 'error');
												_resolve(false, _retries);
											});
										}, 3000 * i); //need a timeout to not call the api too much.                 
									}
									console.groupEnd();
								})(i, _cacheKey);
							}
							console.groupEnd();
						};

					_getData();

					return _deferred.promise;
				}
			};
		}
	]);
