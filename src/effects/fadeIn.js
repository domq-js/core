import { fn } from "../setup";
import { isFunction } from "../core/typechecking";

fn.fadeIn  = function( delay, callback ) {
	this.css( 'opacity', 0 ).show().css( { 'transition': 'opacity ' + delay + 'ms linear 0s', 'opacity': '1' } );
	setTimeout( () => {
		this.show();
		if( isFunction( callback ) ) {
			callback( this );
		}
	}, delay );
	return this;
};
