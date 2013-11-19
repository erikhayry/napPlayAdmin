'use strict';

angular.module('napPlayAdminApp')
  .service('ChartFactory', [function ChartFactory() {
  	var _color1 = "rgba(220,220,220,0.5)",
  		_color2 = "rgba(220,220,220,1)",
  		_color3 = "#fff",
  		_getDataset = function(data, type){
  			var _datasets = []
  			for (var i = 0; i < data.length; i++) {
  				_datasets.push({
		              fillColor : _color1,
		              strokeColor : _color2,
		              pointColor : _color2,
		              pointStrokeColor : _color3,
		              data : data[i].days
  					});
  			};

  			return _datasets;
  		};



  	return{
  		getDataSet: function(data, type){
  			return _getDataset(data, type);
  		}
  	}

  }]);
