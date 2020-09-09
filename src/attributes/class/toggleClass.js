/**
 * Toggles a class from elements.
 *
 * @param {string} className - Toggles A Class From ELement add/Remove
 * @param {string} force -
 * @return {Object} - Returns the _lemon object to allow chaining methods.
 */
export default function( className, force = null ) {
	this.each( function( el ) {
		el.classList.toggle( className, force );
	} );
	return this;
}
