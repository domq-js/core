import isBoolean from "../typechecking/isBoolean";
import isPlainObject from "../typechecking/isPlainObject";
import core from "../setup";
import v from "./vars";
import isArray from "./vars/isArray";

export default function extend( ...sources ) {
	const deep = isBoolean( sources[ 0 ] ) ? sources.shift() : false, target = sources.shift(), length = sources.length;
	if( !target ) {
		return {};
	}
	if( !length ) {
		return extend( deep, core, target );
	}
	for( let i = 0; i < length; i++ ) {
		const source = sources[ i ];
		for( const key in source ) {
			if( deep && ( isArray( source[ key ] ) || isPlainObject( source[ key ] ) ) ) {
				if( !target[ key ] || target[ key ].constructor !== source[ key ].constructor ) {
					target[ key ] = new source[ key ].constructor();
				}
				extend( deep, target[ key ], source[ key ] );
			} else {
				target[ key ] = source[ key ];
			}
		}
	}
	return target;
}
