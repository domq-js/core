import isString from "../typechecking/isString";
import isElement from "../typechecking/isElement";
import { fn } from '../setup';
import isCSSVariable from "./helpers/isCSSVariable";
import getSuffixedValue from "./helpers/getSuffixedValue";
import getPrefixedProp from "./helpers/getPrefixedProp";
import computeStyle from "./helpers/computeStyle";

fn.css = function( prop, value ) {
	if( isString( prop ) ) {
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
			if( !isElement( ele ) ) {
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
};
