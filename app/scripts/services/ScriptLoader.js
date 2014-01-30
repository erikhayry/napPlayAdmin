'use strict';

angular.module('napPlayAdminApp')
	.factory('ScriptLoader', ['$document', '$q', '$rootScope',
		function ScriptLoader($document, $q, $rootScope) {
			var _loaded = [];

			return {
				load: function (src, name) {
					var _script = $q.defer();

					if (_loaded.indexOf(name) > -1) {
						_script.resolve(window[name]);
						return _script.promise;
					}

					var _onScriptLoad = function () {
						// Load client in the browser
						$rootScope.$apply(function () {
							_loaded.push(name);
							_script.resolve(window[name]);
						});
					},

						_scriptTag = $document[0].createElement('script');

					_scriptTag.type = 'text/javascript';
					_scriptTag.async = true;
					_scriptTag.src = src;
					_scriptTag.onreadystatechange = function () {
						if (this.readyState === 'complete') _onScriptLoad();
					};
					_scriptTag.onload = _onScriptLoad;

					$document[0].getElementsByTagName('body')[0].appendChild(_scriptTag);

					return _script.promise;
				}
			};
		}
	]);
