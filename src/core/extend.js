import core from "../wrap";

export default function extend( target, ...objs ) {

	const length = arguments.length;

	if( !length ) {
		return {};
	}

	if( length === 1 ) {
		return extend( core, target );
	}

	for( let i = 1; i < length; i++ ) {
		for( const key in arguments[ i ] ) {
			target[ key ] = arguments[ i ][ key ];
		}
	}
	return target;
}
