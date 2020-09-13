import { fn } from "../setup";

fn.removeClass = function( cls ) {
	return ( arguments.length ) ? this.toggleClass( cls, false ) : this.attr( 'class', '' );
};
