import isFunction from "../typechecking/isFunction";
import _push from "../core/vars/_push";
import { getCompareFunction } from "../helper";

export default function( arr, prop, deep, until ) {
	const plucked    = [],
		  isCallback = isFunction( prop ),
		  compare    = until && getCompareFunction( until );

	for( let i = 0, l = arr.length; i < l; i++ ) {
		if( isCallback ) {
			const val = prop( arr[ i ] );
			if( val.length ) {
				_push.apply( plucked, val );
			}
		} else {
			let val = arr[ i ][ prop ];
			while( val != null ) {
				if( until && compare( -1, val ) ) {
					break;
				}
				plucked.push( val );
				val = deep ? val[ prop ] : null;
			}
		}
	}
	return plucked;
}
