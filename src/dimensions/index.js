import { isUndefined, isWindow, isDocument, isElement } from "../core/typechecking";
import { getExtraSpace, getDocumentDimension } from "./helper";
import { computeStyle, computeStyleInt, getSuffixedValue } from "../css/helper";

/**
 *
 * @param baseHandler
 * @param position Outer/Inner
 * @param prop Width/Height
 * @param includeMargins
 * @return {number|*}
 * @constructor
 */
const OuterInnerHandler  = function( baseHandler, position, prop, includeMargins ) {
	if( !baseHandler[ 0 ] ) {
		return;
	}

	position = ( 'outer' === position ) ? 1 : 0;
	let type = ( 'Width' === prop ) ? 1 : 0;
	if( isWindow( baseHandler[ 0 ] ) ) {
		return position ? baseHandler[ 0 ][ `inner${prop}` ] : baseHandler[ 0 ].document.documentElement[ `client${prop}` ];
	}

	if( isDocument( baseHandler[ 0 ] ) ) {
		return getDocumentDimension( baseHandler[ 0 ], prop );
	}

	return baseHandler[ 0 ][ `${position ? 'offset' : 'client'}${prop}` ] +
		( includeMargins && position ? computeStyleInt( baseHandler[ 0 ], `margin${type ? 'Top' : 'Left'}` ) +
			computeStyleInt( baseHandler[ 0 ], `margin${type ? 'Bottom' : 'Right'}` ) : 0 );
};
const WidthHeightHandler = function( baseHandler, prop, value ) {
	let index = ( 'width' === prop ) ? 0 : 1;

	if( !baseHandler[ 0 ] ) {
		return isUndefined( value ) ? undefined : baseHandler;
	}

	if( !value ) {
		if( isWindow( baseHandler[ 0 ] ) ) {
			return baseHandler[ 0 ].document.documentElement[ `client${prop}` ];
		}

		if( isDocument( baseHandler[ 0 ] ) ) {
			return getDocumentDimension( baseHandler[ 0 ], prop );
		}

		return baseHandler[ 0 ].getBoundingClientRect()[ prop ] - getExtraSpace( baseHandler[ 0 ], !index );
	}


	const valueNumber = parseInt( value, 10 );

	return baseHandler.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}

		const boxSizing   = computeStyle( ele, 'boxSizing' );
		ele.style[ prop ] = getSuffixedValue( prop, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace( ele, !index ) : 0 ) );
	} );

};

export function innerWidth( includeMargins ) {
	return OuterInnerHandler( this, 'inner', 'Width', includeMargins );
}

export function innerHeight( includeMargins ) {
	return OuterInnerHandler( this, 'inner', 'Height', includeMargins );
}

export function outerWidth( includeMargins ) {
	return OuterInnerHandler( this, 'outer', 'Width', includeMargins );
}

export function outerHeight( includeMargins ) {
	return OuterInnerHandler( this, 'outer', 'Height', includeMargins );
}

export function width( value ) {
	return WidthHeightHandler( this, 'width', value );
}

export function height( value ) {
	return WidthHeightHandler( this, 'height', value );
}
