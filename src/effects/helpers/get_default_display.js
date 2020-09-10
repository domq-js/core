import vars from "../../core/vars";
import computeStyle from "../../css/helpers/compute_style";

const defaultDisplay = {};

export default function getDefaultDisplay( tagName ) {
	if( defaultDisplay[ tagName ] ) {
		return defaultDisplay[ tagName ];
	}
	const ele = vars.createElement( tagName );
	vars.doc.body.insertBefore( ele, null );
	const display = computeStyle( ele, 'display' );
	vars.doc.body.removeChild( ele );
	return defaultDisplay[ tagName ] = display !== 'none' ? display : 'block';
}
