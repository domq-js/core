/**
 * Figure out if the element has a class or not.
 *
 * @param {string} className - The class-name we're looking for.
 * @return {boolean} - Whether the element has the class we need or not.
 */
export default function( className ) {
	let found = false;
	this.each( function( el ) {
		if( el.classList.contains( className ) ) {
			found = true;
		}
	} );
	return found;
}
