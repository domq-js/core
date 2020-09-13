import isPlainObject from "../typechecking/isPlainObject";

export default function _each( arr, callback, _reverse ) {
	if( _reverse ) {
		let i = arr.length;
		while( i-- ) {
			if( callback.call( arr[ i ], i, arr[ i ] ) === false ) {
				return arr;
			}
		}
	} else if( isPlainObject( arr ) ) {
		const keys = Object.keys( arr );
		for( let i = 0, l = keys.length; i < l; i++ ) {
			const key = keys[ i ];
			if( callback.call( arr[ key ], key, arr[ key ] ) === false ) {
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
