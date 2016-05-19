/**
 * filter.js
 * @description The filter controls for the yokoMono
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
		bounds:[.25,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Filter'
	} );

	var l_02 = new Interface.Label( {
		bounds:[.229,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Res'
	} );

	var s_01 = new Interface.Slider({
		bounds:[.275,.1,.03,.3],
		min:0, max:100,
		value:0,
		onvaluechange: function() { WebAudio.filterQ( 'dcf', this.value ); }
	} );

	var l_03 = new Interface.Label( {
		bounds:[.2725,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Freq'
	} );

	var s_02 = new Interface.Slider({
		bounds:[.31875,.1,.03,.3],
		min:0, max:1000,
		value:0,
		onvaluechange: function() { WebAudio.filterFrequency( 'dcf', this.value ); }
	} );

	var m_01 = new Interface.Menu( { 
		bounds:[.275,.425,.075,.05],
		css: dict,
		options:['lowpass','highpass'],
		stroke:"#666",
		onvaluechange: function() { WebAudio.filterType( this.value ); }
	} );

	widgets.push( l_01, l_02, l_03, s_01, s_02, m_01 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};