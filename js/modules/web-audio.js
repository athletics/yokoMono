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
	lfo,
	dcf,
	dco01,
	dco02,
	env,
	attackTime,
	releaseTime
;

/**
 * Initializes Module
 */
function init() {

	// Instantiate new AudioContext
	audioContext = new ( window.AudioContext || window.webkitAudioContext )();

	// Define Modules
	var splitter = audioContext.createChannelSplitter( 2 ),
		merger = audioContext.createChannelMerger( 2 )
	;

	dco01 = audioContext.createOscillator();
	dco02 = audioContext.createOscillator();
	lfo = audioContext.createOscillator();
	dcf = audioContext.createBiquadFilter();
	dca01 = audioContext.createGain();
	dca02 = audioContext.createGain();

	// Connections
	dco01.connect( dca01 );
	// dco02.connect(dca02);
	dca01.connect( dca02 );
	dca02.connect(dcf);
	dcf.connect(audioContext.destination);	

	// Settings
	lfo.frequency.value = 0;
	dcf.type = 'lowpass';
	dcf.gain = .5;
	dca01.gain.value = 0;
	attackTime = .05;
	releaseTime = .05;

	// Start Oscillators
	lfo.start(0);
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
 * modulatorConnect
 *
 * @param string name
 * @param string type - sine, square, sawtooth, triangle
 */
function modulatorConnect( name ) {
	
	lfo.connect( eval( name ) );

}

/**
 * modulatorDisconnect
 *
 * @param string name
 * @param string type - sine, square, sawtooth, triangle
 */
function modulatorDisconnect() {
	
	lfo.disconnect();

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
 */
function envelopeTrigger() {
	
	now = audioContext.currentTime;
	dca01.gain.cancelScheduledValues( now );
	dca01.gain.setValueAtTime( 0, now );
	dca01.gain.linearRampToValueAtTime( 1, now + attackTime );
	dca01.gain.linearRampToValueAtTime( 0, now + attackTime + releaseTime );

}

/**
 * envelopeAttack
 * 
 * @param string value
 */
function envelopeAttack( value) {
	
	attackTime = value;

}

/**
 * envelopeRelease
 *
 * @param string value
 */
function envelopeRelease( value) {
	
	releaseTime = value;

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
	modulatorConnect: modulatorConnect,
	modulatorDisconnect: modulatorDisconnect,
	amplifierGain: amplifierGain,
	filterFrequency: filterFrequency,
	filterQ: filterQ,
	envelopeTrigger: envelopeTrigger,
	envelopeAttack: envelopeAttack,
	envelopeRelease: envelopeRelease
};
