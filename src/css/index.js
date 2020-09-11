import typechecking from "../core/typechecking";
import { isCSSVariable, getPrefixedProp, computeStyle, getSuffixedValue } from "./helper";

export default function( prop, value ) {
	if( typechecking.isString( prop ) ) {
		const isVariable = isCSSVariable( prop );
		prop             = getPrefixedProp( prop, isVariable );

		if( arguments.length < 2 ) {
			return this[ 0 ] && computeStyle( this[ 0 ], prop, isVariable );
		}

		if( !prop ) {
			return this;
		}

		value = getSuffixedValue( prop, value, isVariable );

		return this.each( ( i, ele ) => {
			if( !typechecking.isElement( ele ) ) {
				return;
			}

			if( isVariable ) {
				ele.style.setProperty( prop, value );
			} else {
				ele.style[ prop ] = value;
			}
		} );
	}

	for( const key in prop ) {
		this.css( key, prop[ key ] );
	}

	return this;
}
