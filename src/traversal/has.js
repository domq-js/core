import { fn } from "../setup";
import isString from "../typechecking/isString";
import _find from "../core/_find";

fn.has = function( selector ) {
	const comparator = isString( selector ) ? ( i, ele ) => _find( selector, ele ).length : ( i, ele ) => ele.contains( selector );
	return this.filter( comparator );
};
