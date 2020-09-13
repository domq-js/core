import { fn } from "../setup";

fn.addClass = function( cls ) {
	return this.toggleClass( cls, true );
};
