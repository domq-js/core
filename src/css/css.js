import { fn } from '../setup';
import isCSSVariable from "./helpers/isCSSVariable";
import getSuffixedValue from "./helpers/getSuffixedValue";
import getPrefixedProp from "./helpers/getPrefixedProp";
import computeStyle from "./helpers/computeStyle";
import { handleObjectDataLoop } from "../helper";
import { isElement, isNull, isString } from "@varunsridharan/js-is";
import { cssHook } from "../hooks/helper";

fn.css = function( prop, value ) {
	if( isString( prop ) ) {
		const isVariable = isCSSVariable( prop );
		prop             = getPrefixedProp( prop, isVariable );

		if( arguments.length < 2 ) {
			let hook  = cssHook( prop, 'get' ),
				value = ( hook ) ? hook( this[ 0 ], prop, isVariable ) : null;
			return ( isNull( value ) ) ? this[ 0 ] && computeStyle( this[ 0 ], prop, isVariable ) : value;
		}

		if( !prop ) {
			return this;
		}

		value = getSuffixedValue( prop, value, isVariable );

		return this.each( ( i, ele ) => {
			if( !isElement( ele ) ) {
				return;
			}
			let hook = cssHook( prop, 'set' );
			if( hook ) {
				hook( ele, prop, value, isVariable );
			} else {
				if( isVariable ) {
					ele.style.setProperty( prop, value );
				} else {
					ele.style[ prop ] = value;
				}
			}

		} );
	}

	handleObjectDataLoop.call( this, prop, 'css' );
	return this;
};
