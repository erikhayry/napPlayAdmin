'use strict';
/**
 * @ngdoc service
 * @name napPlayAdminApp.RenderValue
 * @function
 * @description
 * Service talking to the The Graphite Render URL API (http://graphite.readthedocs.org/en/latest/render_api.html)
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
          height : '300px',
          width : '400px',

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
