/**
 * envelope.js
 * @description The envelope controls for the yokoMono
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
	var dict = {
	  'border-radius': '0px',
	  'font-family': 'Courier',
	  'text-transform': 'capitalize'
	};

	var l_01 = new Interface.Label( {
		bounds:[.375,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Envelope'
	} );

	var l_02 = new Interface.Label( {
		bounds:[.354,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Att'
	} );

	var s_01 = new Interface.Slider({
		bounds:[.4,.1,.03,.3],
		min:.05, max:2,
		value:.05,
		onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.envelopeAttack( this.value ); 
			}
		}
	} );

	var l_03 = new Interface.Label( {
		bounds:[.39,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Rel'
	} );

	var s_02 = new Interface.Slider({
		bounds:[.44375,.1,.03,.3],
		min:.05, max:2,
		value:.05,
		onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.envelopeRelease( this.value );
			}
		}
	} );

	widgets.push( l_01, l_02, l_03, s_01, s_02 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};