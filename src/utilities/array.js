const core = require( '../core.js' ).default;

core.arrayLike = function( o ) {
	return ( typeof o === 'object' && isFinite( o.length ) );
};

core.flatten = function( ar ) {
	for( var r = [], i = 0, l = ar.length; i < l; ++i ) {
		window.wpopv.arrayLike( ar[ i ] ) ? ( r = r.concat( ar[ i ] ) ) : ( r[ r.length ] = ar[ i ] );
	}
	return r;
};

/**
 * Check to see if an object is a plain object (created using "{}" or "new Object").
 * @param obj
 * @return {boolean|boolean}
 */
core.isPlainObject = function( obj ) {
	let proto, Ctor;

	// Detect obvious negatives
	// Use toString instead of jQuery.type to catch host objects
	if( !obj || String.toString.call( obj ) !== "[object Object]" ) {
		return false;
	}

	proto = Object.getPrototypeOf( obj );

	// Objects with no prototype (e.g., `Object.create( null )`) are plain
	if( !proto ) {
		return true;
	}

	// Objects with prototype are plain iff they were constructed by a global Object function
	Ctor = Object.hasOwnProperty.call( proto, 'constructor' ) && proto.constructor;
	return typeof Ctor === 'function' && Object.toString.call( Ctor ) === Object.hasOwnProperty.toString.call( Object );
};
