import core, { fn } from "../setup";
import { getCompareFunction } from "../helper";
import vars from "../core/vars";
import _filter from "../core/vars/_filter";

fn.filter = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return core( _filter.call( this, ( ele, i ) => compare.call( ele, i, ele ) ) );
};
