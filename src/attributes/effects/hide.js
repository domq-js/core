/**
 * Hide the element(s).
 *
 * @return {Object} - returns the _lemon object to allow chaining methods.
 */
export default function() {
	this.each( function( el ) {
		el.style.display = 'none';
	} );
	return this;
}
