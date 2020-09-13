import core, { fn } from "../setup";
import _slice from "../core/vars/_slice";

fn.slice = function( start, end ) {
	return core( _slice.call( this, start, end ) );
};
