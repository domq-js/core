import { fn } from "../setup";
import { getCompareFunction } from "../helper";
import isString from "../typechecking/isString";
import isElement from "../typechecking/isElement";

fn.not = function( comparator ) {
	const compare = getCompareFunction( comparator );
	return this.filter( ( i, ele ) => ( !isString( comparator ) || isElement( ele ) ) && !compare.call( ele, i, ele ) );
};
