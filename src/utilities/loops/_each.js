/**
 * Run a callback against located elements.
 *
 * @param {function|Object} callback_or_object - The callback we want to run on each element.
 * @param {function|Object} callback - The callback we want to run on each element.
 * @return {Object} - returns the wpopv object to allow chaining methods.
 */
export default function( callback_or_object, callback = false ) {
	let object = ( !callback ) ? this.el : callback_or_object;
	callback   = ( !callback ) ? callback_or_object : callback;
	for( var i = 0; i < object.length; i++ ) {
		let $response = callback( object[ i ] );
		if( true === $response || false === $response ) {
			return $response;
		}
	}
	return this;
}
