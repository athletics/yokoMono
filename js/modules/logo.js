/**
 * logo.js
 * @description Draws the yokoMono logo and associated text
 */

 /**
  * Module Dependencies
  */
 var Interface = require( 'interface' );
 var Panel = require( './panel' );
 var WebAudio = require( './web-audio' );

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

    // Labels
	var l_01 = new Interface.Label( {
		bounds:[.74,.19,.22,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'YM001 MONOPHONIC SYNTHESIZER'

	} );

	var l_02 = new Interface.Label( {
		bounds:[.92,.4,.035,.05],
		font: 'Courier',
		size:12,
		value:'Off/On'
	} );

	// Buttons
	var b_01 = new Interface.Button( { 
		bounds:[.925,.425,.025,.05], 
		mode:'toggle', 
		onvaluechange: function() {
			if ( this.value == 1 ) {
				if ( WebAudio.state() == 'uninit' ) {
					WebAudio.init();
				} else if ( WebAudio.state() == 'suspended' ) {
					WebAudio.on();
				}
			} else {
				WebAudio.off();
			}
		}
	} ); 

	widgets.push( l_01, l_02, b_01 );

	Panel.addWidget( widgets );
}

/**
 * Module Exports
 */
module.exports = {
	init: init,
};