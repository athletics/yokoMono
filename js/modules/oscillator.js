/**
 * oscillator.js
 * @description The oscillator controls for the yokoMono
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
	  'text-transform': 'capitalize',
	  'outline': 'none'
	};

	var l_01 = new Interface.Label( {
		bounds:[0,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Oscillators'
	} );

	var l_02 = new Interface.Label( {
		bounds:[0,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'DCO 1'
	} );

	var m_01 = new Interface.Menu( { 
		bounds:[.025,.1,.075,.05],
		css: dict,
		options:['sine','square','sawtooth','triangle'],
		stroke:"#666",
		onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.oscillatorType( 'dco01', this.value );
			}
		}
	} );

	var s_01 = new Interface.Slider({
		bounds:[.025,.175,.075,.05],
		isVertical: false,
		label:'Detune',
		min:0, max:100,
		value:0,
		onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.oscillatorDetune( 'dco01', this.value );
			}
		}
	});

	var l_03 = new Interface.Label( {
		bounds:[0,.2375,.125,.05],
		font: 'Courier',
		size:14,
		value:'DCO 2'
	} );

	var m_02 = new Interface.Menu( { 
		bounds:[.025,.275,.075,.05],
		css: dict,
		options:['sine','square','sawtooth','triangle'],
		stroke:"#666",
		onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.oscillatorType( 'dco02', this.value );
			}
		}
	} );

	var s_02 = new Interface.Slider( {
	 	bounds:[.025,.35,.075,.05],
	 	isVertical: false,
	 	label:'Detune',
	 	min:0, max:100,
	  	value:0,
	  	onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.oscillatorDetune( 'dco02', this.value );
			}
		  }
	} );

	var s_03 = new Interface.Slider({
		bounds:[.025,.425,.075,.05],
		isVertical: false,
		label:'Amount',
		min:0, max:1,
	  	value:1,
		onvaluechange: function() { 
			if ( WebAudio.state() != 'uninit' ) {
				WebAudio.amplifierGain( 'mix02', this.value );
			}
		}
	} );

	widgets.push( l_01, l_02, l_03, m_01, m_02, s_01,s_02, s_03 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};