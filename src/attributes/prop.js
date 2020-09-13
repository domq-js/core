import { fn } from "../setup";
import isString from "../typechecking/isString";
import cssMaps from "../core/vars/cssMaps";

fn.prop = function( prop, value ) {
	if( !prop ) {
		return;
	}

	if( isString( prop ) ) {
		prop = cssMaps[ prop ] || prop;
		if( arguments.length < 2 ) {
			return this[ 0 ] && this[ 0 ][ prop ];
		}
		return this.each( ( i, ele ) => {
			ele[ prop ] = value;
		} );
	}
	for( const key in prop ) {
		this.prop( key, prop[ key ] );
	}
	return this;
};
