import core, { fn } from "../setup";
import { _filter } from "@varunsridharan/js-vars";

fn.even = function() {
	//return core( grep( this, ( _elem, i ) => ( i + 1 ) % 2 ) );
	return core( _filter.call( this, ( el, i ) => ( i + 1 ) % 2 ) );
};
