/**
 * panel.js
 * @description Sets up the Interface.js panel
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );

/**
 * Module Vars
 */
var panel;

/**
 * Initializes Module
 */
function init() {

	panel = new Interface.Panel( {
	  container:document.querySelector( '.synth ' ),
	  // font: 'Courier',
	} );

	panel.background = 'black';

}

/**
 * addWidget
 *
 * @param string widget name
 */
function addWidget( widgets ) {

	var i;

	for ( i = 0; i < widgets.length; ++i ) {

	    panel.add( widgets[i] );

	}

}

/**
 * Module Exports
 */
module.exports = {
	init: init,
	addWidget: addWidget
};