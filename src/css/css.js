import { fn } from '../setup';
import isCSSVariable from "./helpers/isCSSVariable";
import getSuffixedValue from "./helpers/getSuffixedValue";
import getPrefixedProp from "./helpers/getPrefixedProp";
import computeStyle from "./helpers/computeStyle";
import { handleObjectDataLoop } from "../helper";
import { isElement, isString } from "@varunsridharan/js-is";

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

	handleObjectDataLoop.call( this, prop, 'css' );
	return this;
};
