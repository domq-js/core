import core, { fn } from "../setup";
import isFunction from "../typechecking/isFunction";

fn.fadeTo = function( speed, opacity, easing, callback ) {
	return this.animate( { opacity: opacity }, speed, easing, ( el ) => {
		core( el ).css( 'opacity', opacity );
		if( isFunction( callback ) ) {
			callback( el );
		}
	} );
};
