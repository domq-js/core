import isDocument from "../../typechecking/isDocument";
import getDocumentDimension from "./getDocumentDimension";
import computeStyleInt from "../../css/helpers/computeStyleInt";
import isWindow from "../../typechecking/isWindow";
export default function( baseHandler, position, prop, includeMargins ) {
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
}
