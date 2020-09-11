import typechecking from "../core/typechecking";
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
	if( typechecking.isWindow( baseHandler[ 0 ] ) ) {
		return position ? baseHandler[ 0 ][ `inner${prop}` ] : baseHandler[ 0 ].document.documentElement[ `client${prop}` ];
	}

	if( typechecking.isDocument( baseHandler[ 0 ] ) ) {
		return getDocumentDimension( baseHandler[ 0 ], prop );
	}

	return baseHandler[ 0 ][ `${position ? 'offset' : 'client'}${prop}` ] +
		( includeMargins && position ? computeStyleInt( baseHandler[ 0 ], `margin${type ? 'Top' : 'Left'}` ) +
			computeStyleInt( baseHandler[ 0 ], `margin${type ? 'Bottom' : 'Right'}` ) : 0 );
};
const WidthHeightHandler = function( baseHandler, prop, value ) {
	let index = ( 'width' === prop ) ? 0 : 1;

	if( !baseHandler[ 0 ] ) {
		return typechecking.isUndefined( value ) ? undefined : baseHandler;
	}

	if( !value ) {
		if( typechecking.isWindow( baseHandler[ 0 ] ) ) {
			return baseHandler[ 0 ].document.documentElement[ `client${prop}` ];
		}

		if( typechecking.isDocument( baseHandler[ 0 ] ) ) {
			return getDocumentDimension( baseHandler[ 0 ], prop );
		}

		return baseHandler[ 0 ].getBoundingClientRect()[ prop ] - getExtraSpace( baseHandler[ 0 ], !index );
	}


	const valueNumber = parseInt( value, 10 );

	return baseHandler.each( ( i, ele ) => {
		if( !typechecking.isElement( ele ) ) {
			return;
		}

		const boxSizing   = computeStyle( ele, 'boxSizing' );
		ele.style[ prop ] = getSuffixedValue( prop, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace( ele, !index ) : 0 ) );
	} );

};

const dimensions = {
	innerWidth: function( includeMargins ) {
		return OuterInnerHandler( this, 'inner', 'Width', includeMargins );
	},
	innerHeight: function( includeMargins ) {
		return OuterInnerHandler( this, 'inner', 'Height', includeMargins );
	},
	outerWidth: function( includeMargins ) {
		return OuterInnerHandler( this, 'outer', 'Width', includeMargins );
	},
	outerHeight: function( includeMargins ) {
		return OuterInnerHandler( this, 'outer', 'Height', includeMargins );
	},
	width: function( value ) {
		return WidthHeightHandler( this, 'width', value );
	},
	height: function( value ) {
		return WidthHeightHandler( this, 'height', value );
	}
};

export default dimensions;
