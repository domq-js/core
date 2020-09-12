import regex from "../regex";
import v from "../core/vars";
import { isNumeric, isElement } from "../core/typechecking";
import { _each } from "../helper";
import { camelCase } from "../string/index";

const prefixedProps = {},
	  { style }     = v.div;

export function isCSSVariable( prop ) {
	return regex.cssVariable.test( prop );
}

export function getSuffixedValue( prop, value, isVariable = isCSSVariable( prop ) ) {
	return !isVariable && !v.numericProps[ prop ] && isNumeric( value ) ? `${value}px` : value;
}

export function getPrefixedProp( prop, isVariable = isCSSVariable( prop ) ) {
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

export function computeStyleInt( ele, prop ) {
	return parseInt( computeStyle( ele, prop ), 10 ) || 0;
}

export function computeStyle( ele, prop, isVariable ) {
	if( !isElement( ele ) ) {
		return;
	}
	const style = v.win.getComputedStyle( ele, null );
	return isVariable ? style.getPropertyValue( prop ) || undefined : style[ prop ] || ele.style[ prop ];
}
