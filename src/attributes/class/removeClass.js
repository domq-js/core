/**
 * Remove a class from elements.
 *
 * @param {string} className - The class-name we want to add to element(s).
 * @return {Object} - Returns the _lemon object to allow chaining methods.
 */
export default function( ...className ) {
	this.each( function( el ) {
		el.classList.remove( ...className );
	} );
	return this;
}
