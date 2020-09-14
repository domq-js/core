import isWpopv from "./typechecking/isWpopv";
import isString from "./typechecking/isString";
import isFunction from "./typechecking/isFunction";
import { rsplitValues } from "./core/regex";
import _each from "./core/_each";
import { fn } from "./setup";

export function getCompareFunction( comparator ) {
	return isString( comparator ) ? ( i, ele ) => matches( ele, comparator ) : isFunction( comparator ) ? comparator : isWpopv( comparator ) ? ( i, ele ) => comparator.is( ele ) : !comparator ? () => false : ( i, ele ) => ele === comparator;
}

export function getSplitValues( str ) {
	return isString( str ) ? str.match( rsplitValues ) || [] : [];
}

export function matches( ele, selector ) {
	const matches = ele && ( ele[ 'matches' ] || ele[ 'webkitMatchesSelector' ] || ele[ 'msMatchesSelector' ] );
	return !!matches && !!selector && matches.call( ele, selector );
}

export function handleObjectDataLoop( data, callback ) {
	for( const key in data ) {
		this[ callback ]( key, data[ key ] );
	}
}

export function setupExtraEventsFunctions() {
	_each( 'load error blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split( ' ' ), ( i, _event ) => {
		fn[ _event ] = function( eventData, callback ) {
			if( eventData || callback ) {
				return this.on();
			}
			return this.trigger( _event, eventData, callback );
		};
	} );
}
