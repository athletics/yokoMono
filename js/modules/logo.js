/**
 * logo.js
 * @description Draws the yokoMono logo and associated text
 */

 /**
  * Module Dependencies
  */
 var Interface = require( 'interface' );
 var Panel = require( './panel' );

/**
 * Initializes Module
 */
function init() {

	var context = $( 'canvas' ).get( 0 ).getContext( '2d' ),
		widgets = [];

	base_image = new Image();
	base_image.src = 'assets/yokomono.svg';
	base_image.onload = function(){
		context.drawImage( base_image, 933, 20 );
	}

	var l_01 = new Interface.Label( {
		bounds:[.74,.19,.22,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'YM001 MONOPHONIC SYNTHESIZER'

	} );

	widgets.push( l_01 );

	Panel.addWidget( widgets );
}

/**
 * Module Exports
 */
module.exports = {
	init: init,
};