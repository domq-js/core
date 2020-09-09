/**
 * Run a callback against located elements.
 *
 * @param {function} callback - The callback we want to run on each element.
 * @return {Object} - returns the wpopv object to allow chaining methods.
 */
export default function( callback ) {
	for( var i = 0; i < this.el.length; i++ ) {
		callback( this.el[ i ] );
	}
	return this;
}
