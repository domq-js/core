import core from "../../setup";
import regex from "../../regex";
import vars from "../../core/vars";
import _each from "../../core/_each";

export default function( node, doc ) {
	const collection = core( node );
	collection.filter( 'script' ).add( collection.find( 'script' ) ).each( ( i, ele ) => {
		if( regex.scriptType.test( ele.type ) && vars.docEle.contains( ele ) ) {
			const script = vars.celem( 'script' );
			script.text  = ele.textContent.replace( regex.HTMLCDATA, '' );
			_each( vars.scriptAttributes, ( i, attr ) => {
				if( ele[ attr ] ) {
					script[ attr ] = ele[ attr ];
				}
			} );
			doc.head.insertBefore( script, null );
			doc.head.removeChild( script );
		}
	} );
}
