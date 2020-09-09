/**
 * Add a class to elements.
 *
 * @param {string} className - The class-name we want to add to element(s).
 * @return {Object} - Returns the _lemon object to allow chaining methods.
 */
export default function( ...className ) {
	console.log( className );
	this.each( ( el ) => el.classList.add( ...className ) );
	return this;
}
