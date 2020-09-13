import isUndefined from "../../typechecking/isUndefined";
import isDocument from "../../typechecking/isDocument";
import isElement from "../../typechecking/isElement";
import getDocumentDimension from "./getDocumentDimension";
import isWindow from "../../typechecking/isWindow";
import getExtraSpace from "./getExtraSpace";
import computeStyle from "../../css/helpers/computeStyle";
import getSuffixedValue from "../../css/helpers/getSuffixedValue";

export default function( prop, value ) {
	let index = ( 'width' === prop ) ? 0 : 1;

	if( !this[ 0 ] ) {
		return isUndefined( value ) ? undefined : this;
	}

	if( !value ) {
		if( isWindow( this[ 0 ] ) ) {
			return this[ 0 ].document.documentElement[ `client${prop}` ];
		}

		if( isDocument( this[ 0 ] ) ) {
			return getDocumentDimension( this[ 0 ], prop );
		}

		return this[ 0 ].getBoundingClientRect()[ prop ] - getExtraSpace( this[ 0 ], !index );
	}


	const valueNumber = parseInt( value, 10 );

	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}

		const boxSizing   = computeStyle( ele, 'boxSizing' );
		ele.style[ prop ] = getSuffixedValue( prop, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace( ele, !index ) : 0 ) );
	} );

}
