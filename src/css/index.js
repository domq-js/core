import typechecking from "../core/typechecking";
import isCSSVariable from "./helpers/is_css_variable";
import getPrefixedProp from "./helpers/get_prefixed_prop";
import computeStyle from "./helpers/compute_style";
import getSuffixedValue from "./helpers/get_suffixed_value";

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
