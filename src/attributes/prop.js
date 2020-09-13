import { fn } from "../setup";
import { isString } from "../core/typechecking";
import vars from "../core/vars";

fn.prop       = function( prop, value ) {
	if( !prop ) {
		return;
	}

	if( isString( prop ) ) {
		prop = vars.propMap[ prop ] || prop;
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
