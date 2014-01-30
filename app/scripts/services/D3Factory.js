'use strict';

angular.module('d3', [])
	.factory('D3Factory', ['ScriptLoader',
		function D3Factory(ScriptLoader) {

			var _getD3 = function () {
				return ScriptLoader.load('scripts/vendor/d3.v3.min.js', 'd3');
			};

			return {
				d3: _getD3
			};
		}
	]);
