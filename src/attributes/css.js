/**
 * Get the styles for a property, or change the value if one is defined.
 *
 * @param {string} property - The CSS property we're referencing.
 * @param {string|undefined} value - The value we want to assign, or undefined if we want to get the value.
 * @return {Object|string} - returns the _lemon object to allow chaining methods, OR the value if 2nd arg is undefined.
 */
export default function( property, value ) {
	if( 'undefined' === typeof value ) {
		return getComputedStyle( this.el[ 0 ] )[ property ];
	}
	this.each( function( el ) {
		el.style[ window.wpopv.camelCase( property ) ] = value;
	} );
	return 'undefined' === typeof value ? '' : this;
}
