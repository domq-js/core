import { fn } from "../setup";
import { getCompareFunction } from "../helper";
import { isElement, isString } from "../core/typechecking";

fn.not          = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return this.filter( ( i, ele ) => ( !isString( comparator ) || isElement( ele ) ) && !compare.call( ele, i, ele ) );
};
