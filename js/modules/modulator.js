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

	var s_01 = new Interface.Slider({
		bounds:[.175,.1,.03,.3],
		min:0, max:100,
		value:0,
		// onvaluechange: function() { WebAudio.oscillatorDetune( 'dco01', this.value ); }
	});

	var m_01 = new Interface.Menu( { 
		bounds:[.150,.425,.075,.05],
		css: dict,
		options:['square','triangle'],
		stroke:"#666",
		// onvaluechange: function() { WebAudio.oscillatorType( 'dco01', this.value ); }
	} );


	// Buttons
	var b_01 = new Interface.Button( { 
	  bounds:[.150,.4,.025,.05], 
	  mode:'toggle', 
	  // label:'LFO',
	  onvaluechange: function() {
	    // if ( this.value == 1) {
	    //   LFO.connect(DCA.gain);
	    // } else {
	    //   LFO.disconnect();
	    // }
	  },
	}); 

	widgets.push( l_01, l_02, s_01, m_01 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};