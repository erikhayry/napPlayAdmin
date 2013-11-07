'use strict';
/**
 * @ngdoc service
 * @name napPlayAdminApp.NotificationFactory
 * @function
 * @description
 * NotificationFactory desc goes here
 *
 */
angular.module('napPlayAdminApp')
  .factory('NotificationFactory', ['$http', '$q', function ($http, $q) {
    // Service logic
    var _notifications = [];

    // Public API here
    return {
      
      getNotification: function(){
        return $http.get('https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master');
      },

      setNotificaton: function (){
        var _deferred = $q.defer(),
            _url = "https://api.github.com/repos/erikportin/napPlayAdmin/statuses/master";
            _deferred.resolve(false);

        return _deferred.promise;
      }

    };

  }]);
