import { fn } from "../setup";
import { getCompareFunction } from "../helper";
import v from "../core/vars";

fn.is           = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return v.some.call( this, ( ele, i ) => compare.call( ele, i, ele ) );
};
