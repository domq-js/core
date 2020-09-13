import core, { fn } from "../setup";
import vars from "../core/vars";

fn.slice  = function( start, end ) {
	return core( vars.slice.call( this, start, end ) );
};
