import getDocumentDimension from "./getDocumentDimension";
import computeStyleInt from "../../css/helpers/computeStyleInt";
import { isDocument, isWindow } from "@varunsridharan/js-is";

export default function( ins, position, prop, includeMargins ) {
	if( !this[ 0 ] ) {
		return;
	}

	position = ( 'outer' === position ) ? 1 : 0;
	let type = ( 'Width' === prop ) ? 1 : 0;
	if( isWindow( this[ 0 ] ) ) {
		return position ? this[ 0 ][ `inner${prop}` ] : this[ 0 ].document.documentElement[ `client${prop}` ];
	}

	if( isDocument( this[ 0 ] ) ) {
		return getDocumentDimension( this[ 0 ], prop );
	}

	return this[ 0 ][ `${position ? 'offset' : 'client'}${prop}` ] + ( includeMargins && position ? computeStyleInt( this[ 0 ], `margin${type ? 'Top' : 'Left'}` ) + computeStyleInt( this[ 0 ], `margin${type ? 'Bottom' : 'Right'}` ) : 0 );
}
