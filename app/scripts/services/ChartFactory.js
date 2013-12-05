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
    		},

        /*
          Chart Options
        */
       
        /*
          line options 
        */
       
        _lineOptions = {        
          //Boolean - If we show the scale above the chart data     
          scaleOverlay : false,
          
          //Boolean - If we want to override with a hard coded scale
          scaleOverride : false,
          
          //** Required if scaleOverride is true **
          //Number - The number of steps in a hard coded scale
          scaleSteps : null,
          //Number - The value jump in the hard coded scale
          scaleStepWidth : null,
          //Number - The scale starting value
          scaleStartValue : null,

          //String - Colour of the scale line 
          scaleLineColor : "rgba(0,0,0,.1)",
          
          //Number - Pixel width of the scale line  
          scaleLineWidth : 1,

          //Boolean - Whether to show labels on the scale 
          scaleShowLabels : true,
          
          //Interpolated JS string - can access value
          scaleLabel : "<%=value%>",
          
          //String - Scale label font declaration for the scale label
          scaleFontFamily : "'Arial'",
          
          //Number - Scale label font size in pixels  
          scaleFontSize : 12,
          
          //String - Scale label font weight style  
          scaleFontStyle : "normal",
          
          //String - Scale label font colour  
          scaleFontColor : "#666",  
          
          ///Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines : true,
          
          //String - Colour of the grid lines
          scaleGridLineColor : "rgba(0,0,0,.05)",
          
          //Number - Width of the grid lines
          scaleGridLineWidth : 1, 
          
          //Boolean - Whether the line is curved between points
          bezierCurve : true,
          
          //Boolean - Whether to show a dot for each point
          pointDot : true,
          
          //Number - Radius of each point dot in pixels
          pointDotRadius : 3,
          
          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth : 1,
          
          //Boolean - Whether to show a stroke for datasets
          datasetStroke : true,
          
          //Number - Pixel width of dataset stroke
          datasetStrokeWidth : 2,
          
          //Boolean - Whether to fill the dataset with a colour
          datasetFill : true,
          
          //Boolean - Whether to animate the chart
          animation : true,

          //Number - Number of animation steps
          animationSteps : 60,
          
          //String - Animation easing effect
          animationEasing : "easeOutBounce", //examples http://easings.net/

          //Function - Fires when the animation is complete
          onAnimationComplete : null
        },

        /*
          bar options 
         */
          
        _barOptions = {
          //Boolean - If we show the scale above the chart data     
          scaleOverlay : false,
          
          //Boolean - If we want to override with a hard coded scale
          scaleOverride : false,
          
          //** Required if scaleOverride is true **
          //Number - The number of steps in a hard coded scale
          scaleSteps : null,
          //Number - The value jump in the hard coded scale
          scaleStepWidth : null,
          //Number - The scale starting value
          scaleStartValue : null,

          //String - Colour of the scale line 
          scaleLineColor : "rgba(0,0,0,.1)",
          
          //Number - Pixel width of the scale line  
          scaleLineWidth : 1,

          //Boolean - Whether to show labels on the scale 
          scaleShowLabels : true,
          
          //Interpolated JS string - can access value
          scaleLabel : "<%=value%>",
          
          //String - Scale label font declaration for the scale label
          scaleFontFamily : "'Arial'",
          
          //Number - Scale label font size in pixels  
          scaleFontSize : 12,
          
          //String - Scale label font weight style  
          scaleFontStyle : "normal",
          
          //String - Scale label font colour  
          scaleFontColor : "#666",  
          
          ///Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines : true,
          
          //String - Colour of the grid lines
          scaleGridLineColor : "rgba(0,0,0,.05)",
          
          //Number - Width of the grid lines
          scaleGridLineWidth : 1, 

          //Boolean - If there is a stroke on each bar  
          barShowStroke : true,
          
          //Number - Pixel width of the bar stroke  
          barStrokeWidth : 2,
          
          //Number - Spacing between each of the X value sets
          barValueSpacing : 5,
          
          //Number - Spacing between data sets within X values
          barDatasetSpacing : 1,
          
          //Boolean - Whether to animate the chart
          animation : true,

          //Number - Number of animation steps
          animationSteps : 60,
          
          //String - Animation easing effect
          animationEasing : "easeOutQuart", //examples http://easings.net/

          //Function - Fires when the animation is complete
          onAnimationComplete : null 
        };

  	return{
      /**
       * Converts the label data to datasets.
       *
       * Example of chart data structure for a line chart
       *
       * var data = {
          labels : ["January","February","March","April","May","June","July"],
          datasets : [
            {
              fillColor : "rgba(220,220,220,0.5)",
              strokeColor : "rgba(220,220,220,1)",
              pointColor : "rgba(220,220,220,1)",
              pointStrokeColor : "#fff",
              data : [65,59,90,81,56,55,40]
            },
            {
              fillColor : "rgba(151,187,205,0.5)",
              strokeColor : "rgba(151,187,205,1)",
              pointColor : "rgba(151,187,205,1)",
              pointStrokeColor : "#fff",
              data : [28,48,40,19,96,27,100]
            }
          ]
        }
       * 
       * @param  {Array}  chart data
       * @param  {String} type of chart, bar or line 
       * @return {Array} chart.js dataset array
       */
  		getDataSet: function(data, type){
  			return _getDataset(data, type);
  		},
      
      /**
       * returns chart.js chart options
       * @param  {String} type line or bar
       * @return {Object}      chart options object
       */
      getOptions: function(type){
        switch(type){
          case 'line' :
            return _lineOptions;
          break;
          case 'bar' :
            return _barOptions;
          break;   
        }
      }
  	}

  }]);
