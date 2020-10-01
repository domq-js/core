import { fn } from "../setup";
import { _slice } from "@varunsridharan/js-vars";
import { isUndefined } from "@varunsridharan/js-is";

fn.get = function( index ) {
	if( isUndefined( index ) ) {
		return _slice.call( this );
	}
	index = Number( index );
	return this[ index < 0 ? index + this.length : index ];
};
