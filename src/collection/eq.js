import core, { fn } from "../setup";

fn.eq = function( index ) {
	return core( this.get( index ) );
};
