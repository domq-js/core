import { fn } from "../setup";
import { isFunction } from "../core/typechecking";

fn.fadeOut = function( delay, callback ) {
	this.css( { 'transition': 'opacity ' + delay + 'ms linear 0s', 'opacity': '0' } );
	setTimeout( () => {
		this.hide();
		if( isFunction( callback ) ) {
			callback( this );
		}
	}, delay );
	return this;
};
