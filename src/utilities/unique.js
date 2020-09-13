import _indexOf from "../core/vars/_indexOf";
import _filter from "../core/vars/_filter";

export default function( arr ) {
	return arr.length > 1 ? _filter.call( arr, ( item, index, self ) => _indexOf.call( self, item ) === index ) : arr;
}
