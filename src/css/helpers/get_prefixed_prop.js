import each from "../../core/each";
import vars from "../../core/vars";
import stringHandler from "../../string";
import isCSSVariable from "./is_css_variable";

const prefixedProps = {},
	  { style }     = vars.div;

export default function getPrefixedProp( prop, isVariable = isCSSVariable( prop ) ) {
	if( isVariable ) {
		return prop;
	}

	if( !prefixedProps[ prop ] ) {
		const propCC = stringHandler.camelCase( prop ),
			  propUC = `${propCC[ 0 ].toUpperCase()}${propCC.slice( 1 )}`,
			  props  = ( `${propCC} ${vars.vendorsPrefixes.join( `${propUC} ` )}${propUC}` ).split( ' ' );

		each( props, ( i, p ) => {
			if( p in style ) {
				prefixedProps[ prop ] = p;
				return false;
			}
		} );
	}
	return prefixedProps[ prop ];
}
