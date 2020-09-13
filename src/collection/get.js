import { fn } from "../setup";
import { isUndefined } from "../core/typechecking";
import vars from "../core/vars";

fn.get    = function( index ) {
	if( isUndefined( index ) ) {
		return vars.slice.call( this );
	}
	index = Number( index );
	return this[ index < 0 ? index + this.length : index ];
};
