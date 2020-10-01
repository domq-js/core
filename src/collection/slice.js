import core, { fn } from "../setup";
import { _slice } from "@varunsridharan/js-vars";

fn.slice = function( start, end ) {
	return core( _slice.call( this, start, end ) );
};
