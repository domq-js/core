import { celem, doc } from "../core/vars";
import { computeStyle } from "../css/helper";

const defaultDisplay = {};

export function getDefaultDisplay( tagName ) {
	if( defaultDisplay[ tagName ] ) {
		return defaultDisplay[ tagName ];
	}
	const ele = celem( tagName );
	doc.body.insertBefore( ele, null );
	const display = computeStyle( ele, 'display' );
	doc.body.removeChild( ele );
	return defaultDisplay[ tagName ] = display !== 'none' ? display : 'block';
}

export function isHidden( ele ) {
	return computeStyle( ele, 'display' ) === 'none';
}
