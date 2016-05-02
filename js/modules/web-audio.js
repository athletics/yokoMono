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
var audioContext,
	dca01,
	dca02,
	dcf,
	dco01,
	dco02,
	env
;

/**
 * Initializes Module
 */
function init() {

	// Instantiate new AudioContext
	audioContext = new ( window.AudioContext || window.webkitAudioContext )();

	// Define Modules
	var LFO = audioContext.createOscillator(),
		splitter = audioContext.createChannelSplitter( 2 ),
		merger = audioContext.createChannelMerger( 2 )
	;

	dco01 = audioContext.createOscillator();
	dco02 = audioContext.createOscillator();
	dca01 = audioContext.createGain();
	dca02 = audioContext.createGain();
	dcf = audioContext.createBiquadFilter();

	// Connections
	dco01.connect( dca01 );
	// dco02.connect(dca02);
	dca01.connect( dcf );
	// dca02.connect(dcf);
	dcf.connect(audioContext.destination);	

	// Settings
	LFO.frequency.value = 0;
	dcf.type = 'lowpass';
	dcf.gain = .5;
	dca01.gain.value = 0;


	// Start Oscillators
	LFO.start(0);
	dco01.start(0);
	// dco02.start(0);

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
 * filterFrequency
 *
 * @param string name
 * @param string value
 */
function filterFrequency( name, value ) {
	
	eval( name ).frequency.value = value;

}

/**
 * filterQ
 *
 * @param string name
 * @param string value
 */
function filterQ( name, value ) {
	
	eval( name ).Q.value = value;

}

/**
 * envelopeTrigger
 *
 * @param string name
 * @param string value
 */
function envelopeTrigger() {
	
	now = audioContext.currentTime;
	dca01.gain.cancelScheduledValues(now);
	dca01.gain.setValueAtTime(0, now);
	dca01.gain.linearRampToValueAtTime(1, now + 1);
	dca01.gain.linearRampToValueAtTime(0, now + 1 + 1);

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
	oscillatorFrequency: oscillatorFrequency,
	oscillatorType: oscillatorType,
	amplifierGain: amplifierGain,
	filterFrequency: filterFrequency,
	filterQ: filterQ,
	envelopeTrigger: envelopeTrigger
};
