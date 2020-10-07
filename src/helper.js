import isdomQ from "./typechecking/isdomQ";
import { rsplitValues } from "./core/regex";
import _each from "./core/_each";
import core, { fn } from "./setup";
import { isFunction, isString } from "@varunsridharan/js-is";

export function getCompareFunction( comparator ) {
	return isString( comparator ) ? ( i, ele ) => core.is( ele, comparator ) : isFunction( comparator ) ? comparator : isdomQ( comparator ) ? ( i, ele ) => comparator.is( ele ) : !comparator ? () => false : ( i, ele ) => ele === comparator;
}

export function getSplitValues( str ) {
	if( isFunction( str ) ) {
		return [ str ];
	}
	return isString( str ) ? str.match( rsplitValues ) || [] : [];
}

export function handleObjectDataLoop( data, callback ) {
	for( const key in data ) {
		this[ callback ]( key, data[ key ] );
	}
}

export function setupExtraEventsFunctions() {
	_each( 'load error blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split( ' ' ), ( i, _event ) => {
		fn[ _event ] = function( eventData, callback ) {
			return ( eventData || callback ) ? this.on( _event, eventData, callback ) : this.trigger( _event, eventData, callback );
		};
	} );
}

export function access( value, index, elem ) {
	return ( isFunction( value ) ) ? value.call( elem, index, elem ) : value;
}
