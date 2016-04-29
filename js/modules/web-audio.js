/**
 * web-audio.js
 * @description Brief Description
 */

/**
 * Module Dependencies
 */

/**
 * Module Vars
 */
var dco01,
	dco02,
	dca01,
	dca02
;

/**
 * Initializes Module
 */
function init() {
	
	// Define Modules
	var audioContext = new (window.AudioContext || window.webkitAudioContext)(),
		DCF = audioContext.createBiquadFilter(),
		LFO = audioContext.createOscillator(),
		splitter = audioContext.createChannelSplitter(2),
		merger = audioContext.createChannelMerger(2)
	;

	dco01 = audioContext.createOscillator();
	dco02 = audioContext.createOscillator();
	dca01 = audioContext.createGain();
	dca02 = audioContext.createGain();


	// Connections
	dco01.connect(dca01);
	dco02.connect(dca02);
	dca01.connect(DCF);
	dca02.connect(DCF);
	DCF.connect(audioContext.destination);

	// Settings
	LFO.frequency.value = 0;
	DCF.type = 'lowpass';
	DCF.gain = .5;
	dco01.frequency.value = 261.626;
	dco02.frequency.value = 261.626;

	// Start Oscillators
	LFO.start(0);
	dco01.start(0);
	dco02.start(0);

}

/**
 * oscillatorDetune
 *
 * @param string name
 * @param string value 
 */
function oscillatorDetune( name, value ) {
	
	eval( name ).detune.value = value;

}

/**
 * oscillatorFrequency
 *
 * @param string name
 * @param string value 
 */
function oscillatorFrequency( name, value ) {
	
	eval( name ).frequency.value = value;

}

/**
 * oscillatorType
 *
 * @param string name
 * @param string type - sine, square, sawtooth, triangle
 */
function oscillatorType( name, type ) {
	
	eval( name ).type = type;

}

/**
 * amplifierGain
 *
 * @param string name
 * @param string value
 */
function amplifierGain( name, value ) {
	
	eval( name ).gain.value = value;

}

/**
 * Private Method
 *
 * @return integer
 */
function privateMethod() {
	return 0;
}

/**
 * Module Exports
 */
module.exports = {
	init: init,
	oscillatorDetune: oscillatorDetune,
	oscillatorType: oscillatorType,
	amplifierGain: amplifierGain
};
