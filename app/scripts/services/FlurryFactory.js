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
 */

angular.module('napPlayAdminApp')
  .service('FlurryFactory', ['$http', 'FlurryValue', function FlurryFactory($http, FlurryValue) {
  	var _apiKey = 'BRZXMJS2NRHDNN37CKQM',
        _accessCode = 'ENQZAUFQ5KQ2C24XKT7Z',
        _baseUrl = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=' + _accessCode + '&apiKey=' + _apiKey + '&startDate=' + FlurryValue.startDate + '&endDate=' + FlurryValue.endDate;
    
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
