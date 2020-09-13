import isCSSVariable from "./isCSSVariable";
import { camelCase } from "../../string";
import v from "../../core/vars";
import _each from "../../core/_each";

const prefixedProps = {},
	  { style }     = v.div;

export default function( prop, isVariable = isCSSVariable( prop ) ) {
	if( isVariable ) {
		return prop;
	}

	if( !prefixedProps[ prop ] ) {
		const propCC = camelCase( prop ),
			  propUC = `${propCC[ 0 ].toUpperCase()}${propCC.slice( 1 )}`,
			  props  = ( `${propCC} ${v.vendorsPrefixes.join( `${propUC} ` )}${propUC}` ).split( ' ' );

		_each( props, ( i, p ) => {
			if( p in style ) {
				prefixedProps[ prop ] = p;
				return false;
			}
		} );
	}
	return prefixedProps[ prop ];
}
