import core, { fn } from "../setup";
import { getCompareFunction } from "../helper";
import vars from "../core/vars";

fn.filter = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return core( vars.filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );
};
