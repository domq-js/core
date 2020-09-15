import computeStyle from "../../css/helpers/computeStyle";
import body from "../../core/vars/body";
import celem from "../../core/vars/celem";

const defaultDisplay = {};

export default function( tagName ) {
	if( defaultDisplay[ tagName ] ) {
		return defaultDisplay[ tagName ];
	}
	const ele = celem( tagName );
	body.insertBefore( ele, null );
	const display = computeStyle( ele, 'display' );
	body.removeChild( ele );
	return defaultDisplay[ tagName ] = display !== 'none' ? display : 'block';
}
