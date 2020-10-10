import core, { fn } from "../setup";
import { _filter } from "@varunsridharan/js-vars";

fn.even = function() {
	return core( _filter.call( this, ( el, i ) => ( i + 1 ) % 2 ) );
};
