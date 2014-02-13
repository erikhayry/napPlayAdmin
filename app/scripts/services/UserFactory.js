'use strict';

angular.module('napPlayAdminApp')
	.factory('UserFactory', function ($http) {
		var _country = 'GB',
			_host = 'https://nap-play.herokuapp.com',
			_authToken = 'ccd14408da968eae1faf54f982c0ae8f10063a48dc0ff282d6e82a6282b7e4e032d3b82059c4271081ba582fb32a358bbea13c3d29ccc4b5ed0ec9991164120a',
			_depth = '1',

			//urls
			_subGraphUrl = function (id) {
				return _host + '/api/subgraph/' + id + '?depth=' + _depth + '&country=' + _country + '&authToken=' + _authToken;
			},

			_userDataUrl = function (id) {
				return _host + '/api/users/' + id + '?country=' + _country + '&authToken=' + _authToken;
			},

			_userLoves = function (id) {
				return _host + '/api/users/' + id + '/loves?country=' + _country + '&authToken=' + _authToken;
			},

			_userAdmirers = function (id) {
				return _host + '/api/users/' + id + '/admirers?country=' + _country + '&authToken=' + _authToken;
			},

			_userAdmirees = function (id) {
				return _host + '/api/users/' + id + '/admirees?country=' + _country + '&authToken=' + _authToken;
			};

		// Public API here
		return {
			getUserData: function (id) {
				return $http.get(_userDataUrl(id));
			},

			getSubGraph: function (id) {
				return $http.get(_subGraphUrl(id));
			},

			getUserLoves: function (id) {
				return $http.get(_userLoves(id));
			},

			getUserAdmirers: function (id) {
				return $http.get(_userAdmirers(id));
			},

			getUserAdmirees: function (id) {
				return $http.get(_userAdmirees(id));
			}
		};
	});
