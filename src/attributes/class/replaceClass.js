/**
 * Replace a class from elements.
 *
 * @param {string} from - The class-name we want to change from
 * @param {string} to - The class-name we want to change to
 * @return {Object} - Returns the _lemon object to allow chaining methods.
 */
export default function replaceClass( from, to ) {
	this.each( function( el ) {
		el.classList.replace( from, to );
	} );
	return this;
}
