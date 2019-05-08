/**
 * keyboard.js
 * @description The lfo controls for the yokoMono
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );
var Panel = require( './panel' );
var WebAudio = require( './web-audio' );

/**
 * Module Vars
 */

/**
 * Initializes Module
 */
function init() {

	var widgets = [];

	var kb = new Interface.Piano( { 
		bounds:[.05,.55,.9,.4],
		startletter : "C",
		endletter : "C",
		startoctave : 3,
		endoctave : 5,
		onvaluechange : function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.envelopeTrigger(); 
				WebAudio.oscillatorFrequency( 'dco01', this.frequency); 
				WebAudio.oscillatorFrequency( 'dco02', this.frequency);			
			}
		}
	} ); 

	widgets.push( kb );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};