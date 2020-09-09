/**
 * Run a callback against located elements.
 *
 * @param {function} callback - The callback we want to run on each element.
 * @return {Object} - returns the wpopv object to allow chaining methods.
 */
export default function( callback ) {
	if( this.el.length > 1 ) {
		for( var i = 0; i < this.el.length; i++ ) {
			callback( this.el[ i ], i );
		}
	} else {
		callback( this.el[ 0 ], 0 );
	}
	return this;
}
