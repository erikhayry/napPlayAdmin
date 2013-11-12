'use strict';
/**
 * @ngdoc service
 * @name napPlayAdminApp.GraphiteValue
 * @function
 * @description
 * Desc goes here
 *
 */

angular.module('napPlayAdminApp')
	/** @module GraphiteValue */
  	.value('GraphiteValue', 
        {
          from : '',
          until : '',
          areaAlpha : '',
          areaMode : '', //none, first, all, stacked,
          drawNullAsZero : '',

          //dimensions
          height : '300', //without px
          width : '400', //without px

          //colours
          bgcolor : '',
          colorList : '',
          fgcolor : '',

          //text style
          fontBold : '',
          fontItalic : '',
          fontName : '',
          fontSize : '',            
    	}
	);
