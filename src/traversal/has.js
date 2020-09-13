import { fn } from "../setup";
import { isString } from "../core/typechecking";

fn.has          = function( selector ) {
	const comparator = isString( selector ) ? ( i, ele ) => find( selector, ele ).length : ( i, ele ) => ele.contains( selector );
	return this.filter( comparator );
};
