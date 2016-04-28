/**
 * Module Name
 * @description Brief Description
 */

/**
 * Module Dependencies
 */
var $ = require( 'jquery' ),
	Util = require( './util' );

/**
 * Module Vars
 */
var debugEnabled = false,
	debug = debugEnabled ? Util.debug : function () {};

/**
 * Initializes Module
 */
function init() {
	debug( 'ModuleName' );
}

/**
 * Public Method
 *
 * @param string parameter
 * @return string
 */
function publicMethod( parameter ) {
	var returnValue = parameter;

	return returnValue;
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
	publicMethod: publicMethod
};