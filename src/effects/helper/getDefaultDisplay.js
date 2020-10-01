import computeStyle from "../../css/helpers/computeStyle";
import celem from "../../core/vars/celem";
import doc from "../../core/vars/doc";

const defaultDisplay = {};

export default function( tagName ) {
	if( defaultDisplay[ tagName ] ) {
		return defaultDisplay[ tagName ];
	}
	const ele = celem( tagName );
	doc.body.insertBefore( ele, null );
	const display = computeStyle( ele, 'display' );
	doc.body.removeChild( ele );
	return defaultDisplay[ tagName ] = display !== 'none' ? display : 'block';
}
