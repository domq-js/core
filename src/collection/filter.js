import core, { fn } from "../setup";
import { getCompareFunction } from "../helper";
import { _filter } from "@varunsridharan/js-vars";

fn.filter = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return core( _filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );
};
