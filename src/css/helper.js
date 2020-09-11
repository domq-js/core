import regex from "../regex";
import vars from "../core/vars";
import typechecking from "../core/typechecking";
import each from "../core/each";
import stringHandler from "../string";

const prefixedProps = {},
	  { style }     = vars.div;

export function isCSSVariable( prop ) {
	return regex.cssVariable.test( prop );
}

export function getSuffixedValue( prop, value, isVariable = isCSSVariable( prop ) ) {
	return !isVariable && !vars.numericProps[ prop ] && typechecking.isNumeric( value ) ? `${value}px` : value;
}

export function getPrefixedProp( prop, isVariable = isCSSVariable( prop ) ) {
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

export function computeStyleInt( ele, prop ) {
	return parseInt( computeStyle( ele, prop ), 10 ) || 0;
}

export function computeStyle( ele, prop, isVariable ) {
	if( !typechecking.isElement( ele ) ) {
		return;
	}
	const style = vars.win.getComputedStyle( ele, null );
	return isVariable ? style.getPropertyValue( prop ) || undefined : style[ prop ] || ele.style[ prop ];
}
