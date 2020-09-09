import core from '../core';

/**
 * Convert a string to camelCase.
 *
 * @param {string} string The string we want to convert.
 * @return {string} - Returns the string formatted in camelCase.
 */
core.camelCase = function( string ) {
	return string.replace( /-([a-z])/g, function( _all, letter ) {
		return letter.toUpperCase();
	} );
};
