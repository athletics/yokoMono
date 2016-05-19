/**
 * modulator.js
 * @description The modulator controls for the yokoMono
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

	// Labels
	var l_01 = new Interface.Label( {
		bounds:[.125,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Modulator'
	} );

	var l_02 = new Interface.Label( {
		bounds:[.125,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Rate'
	} );

	var l_03 = new Interface.Label( {
		bounds:[.145,.325,.035,.05],
		font: 'Courier',
		size:12,
		value:'On/Off'
	} );


	// Sliders
	var s_01 = new Interface.Slider({
		bounds:[.195,.1,.03,.3],
		min:0, max:20,
		value:0,
		onvaluechange: function() { WebAudio.oscillatorFrequency( 'lfo', this.value ); }
	} );

	// Menus
	var m_01 = new Interface.Menu( { 
		bounds:[.150,.425,.075,.05],
		css: dict,
		options:['square','triangle'],
		stroke:"#666",
		onvaluechange: function() { WebAudio.oscillatorType( 'lfo', this.value ); }
	} );

	// Buttons
	var b_01 = new Interface.Button( { 
	  bounds:[.150,.3525,.025,.05], 
	  mode:'toggle', 
	  // label:'LFO',
	  onvaluechange: function() {
	    if ( this.value == 1) {
	    	WebAudio.modulatorConnect( 'dca02.gain' );
	    } else {
	    	WebAudio.modulatorDisconnect();
	    }
	  }
	} ); 

	widgets.push( l_01, l_02, l_03, s_01, m_01, b_01 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};