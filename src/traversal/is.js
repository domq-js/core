import { fn } from "../setup";
import { getCompareFunction } from "../helper";
import _some from "../core/vars/_some";

fn.is = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return _some.call( this, ( ele, i ) => compare.call( ele, i, ele ) );
};
