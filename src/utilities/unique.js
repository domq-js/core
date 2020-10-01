import { _filter, _indexOf } from "@varunsridharan/js-vars";

export default function( arr ) {
	return arr.length > 1 ? _filter.call( arr, ( item, index, self ) => _indexOf.call( self, item ) === index ) : arr;
}
