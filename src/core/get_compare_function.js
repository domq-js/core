import vars from "./vars";
import matches from "./matches";
import typechecking from "./typechecking";

export default function getCompareFunction( comparator ) {
	return vars.isString( comparator ) ? ( i, ele ) => matches( ele, comparator ) : typechecking.isFunction( comparator ) ? comparator : typechecking.isWpopv( comparator ) ? ( i, ele ) => comparator.is( ele ) : !comparator ? () => false : ( i, ele ) => ele === comparator;
}
