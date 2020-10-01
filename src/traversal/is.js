import { fn } from "../setup";
import { getCompareFunction } from "../helper";
import { _some } from "@varunsridharan/js-vars";

fn.is = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return _some.call( this, ( ele, i ) => compare.call( ele, i, ele ) );
};
