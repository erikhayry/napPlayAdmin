'use strict';
/**
 * @ngdoc service
 * @name napPlayAdminApp.RenderValue
 * @function
 * @description
 * Desc goes here
 *
 */

angular.module('napPlayAdminApp')
	/** @module RenderValue */
  	.value('RenderValue', 
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
