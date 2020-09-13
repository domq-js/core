import core from "./setup";
import { isElement, isDocument, isFunction, isString, isWpopv, isPlainObject, isBoolean } from "./core/typechecking";
import v from "./core/vars";
import regex from "./regex";

export function _each( arr, callback, _reverse ) {
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

export function extend( ...sources ) {
	const deep = isBoolean( sources[ 0 ] ) ? sources.shift() : false, target = sources.shift(), length = sources.length;
	if( !target ) {
		return {};
	}
	if( !length ) {
		return extend( deep, core, target );
	}
	for( let i = 0; i < length; i++ ) {
		const source = sources[ i ];
		for( const key in source ) {
			if( deep && ( v.isArray( source[ key ] ) || isPlainObject( source[ key ] ) ) ) {
				if( !target[ key ] || target[ key ].constructor !== source[ key ].constructor ) {
					target[ key ] = new source[ key ].constructor();
				}
				extend( deep, target[ key ], source[ key ] );
			} else {
				target[ key ] = source[ key ];
			}
		}
	}
	return target;
}

export function filtered( instance, comparator ) {
	return !comparator ? instance : instance.filter( comparator );
}

export function _find( selector, context ) {
	return !selector || ( !isDocument( context ) && !isElement( context ) ) ? [] : regex.class.test( selector ) ? context.getElementsByClassName( selector.slice( 1 ) ) : regex.tag.test( selector ) ? context.getElementsByTagName( selector ) : context.querySelectorAll( selector );
}

export function getCompareFunction( comparator ) {
	return isString( comparator ) ? ( i, ele ) => matches( ele, comparator ) : isFunction( comparator ) ? comparator : isWpopv( comparator ) ? ( i, ele ) => comparator.is( ele ) : !comparator ? () => false : ( i, ele ) => ele === comparator;
}

export function getSplitValues( str ) {
	return isString( str ) ? str.match( regex.splitValues ) || [] : [];
}

export function matches( ele, selector ) {
	const matches = ele && ( ele[ 'matches' ] || ele[ 'webkitMatchesSelector' ] || ele[ 'msMatchesSelector' ] );
	return !!matches && !!selector && matches.call( ele, selector );
}

export function pluck( arr, prop, deep, until ) {
	const plucked    = [],
		  isCallback = isFunction( prop ),
		  compare    = until && getCompareFunction( until );

	for( let i = 0, l = arr.length; i < l; i++ ) {
		if( isCallback ) {
			const val = prop( arr[ i ] );
			if( val.length ) {
				v.push.apply( plucked, val );
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

export function unique( arr ) {
	return arr.length > 1 ? v.filter.call( arr, ( item, index, self ) => v.indexOf.call( self, item ) === index ) : arr;
}
