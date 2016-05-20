/**
 * noise.js
 * @description Noise generators
 */

/**
 * Module Dependencies
 */

/**
 * Module Vars
 */
var debugEnabled = false,
	debug = debugEnabled ? Util.debug : function () {};

/**
 * Initializes Module
 */
function init( audioContext) {

	var bufferSize = 2 * audioContext.sampleRate,
	    noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
	    output = noiseBuffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i++) {
	    output[i] = Math.random() * 2 - 1;
	}

	var whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	whiteNoise.start(0);

	return	whiteNoise;

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};