import { fn } from "../setup";
import _find from "../core/_find";
import { isString } from "@varunsridharan/js-is";

fn.has = function( selector ) {
	const comparator = isString( selector ) ? ( i, ele ) => _find( selector, ele ).length : ( i, ele ) => ele.contains( selector );
	return this.filter( comparator );
};
