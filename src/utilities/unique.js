import v from "../core/vars";

export default function( arr ) {
	return arr.length > 1 ? v.filter.call( arr, ( item, index, self ) => v.indexOf.call( self, item ) === index ) : arr;
}
