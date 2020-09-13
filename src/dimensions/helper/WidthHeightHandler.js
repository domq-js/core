import { isDocument, isElement, isUndefined, isWindow } from "../../core/typechecking";
import getDocumentDimension from "./getDocumentDimension";
import getExtraSpace from "./getExtraSpace";
import computeStyle from "../../css/helpers/computeStyle";
import getSuffixedValue from "../../css/helpers/getSuffixedValue";

export default function( baseHandler, prop, value ) {
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

}
