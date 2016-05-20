/**
 * logo.js
 * @description Draws the yokoMono logo
 */

/**
 * Initializes Module
 */
function init() {

	var context = $( 'canvas' ).get( 0 ).getContext( '2d' );

	base_image = new Image();
	base_image.src = 'assets/yokomono.svg';
	base_image.onload = function(){
		context.drawImage(base_image, 933, 21);
	}

}

/**
 * Module Exports
 */
module.exports = {
	init: init,
};