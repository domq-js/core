export default function each( arr, callback, _reverse ) {
	if( _reverse ) {
		let i = arr.length;
		while( i-- ) {
			if( callback.call( arr[ i ], i, arr[ i ] ) === false ) {
				return arr;
			}
		}
	} else {
		for( let i = 0, l = arr.length; i < l; i++ ) {
			if( callback.call( arr[ i ], i, arr[ i ] ) === false ) {
				return arr;
			}
		}
	}
	return arr;
}
