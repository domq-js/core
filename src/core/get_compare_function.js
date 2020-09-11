import matches from "./matches";
import { isString, isFunction, isWpopv } from "./typechecking";

export default function getCompareFunction( comparator ) {
	return isString( comparator ) ?
		( i, ele ) => matches( ele, comparator ) : isFunction( comparator ) ? comparator : isWpopv( comparator ) ? ( i, ele ) => comparator.is( ele ) : !comparator ? () => false : ( i, ele ) => ele === comparator;
}
