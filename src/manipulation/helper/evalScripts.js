import core from "../../setup";
import regex from "../../regex";
import v from "../../core/vars";
import docEle from "../../core/vars/docEle";
import scriptAttrs from "../../core/vars/scriptAttrs";
import _each from "../../core/_each";
import celem from "../../core/vars/celem";

export default function( node, doc ) {
	const collection = core( node );
	collection.filter( 'script' ).add( collection.find( 'script' ) ).each( ( i, ele ) => {
		if( regex.scriptType.test( ele.type ) && docEle.contains( ele ) ) {
			const script = celem( 'script' );
			script.text  = ele.textContent.replace( regex.HTMLCDATA, '' );
			_each( scriptAttrs, ( i, attr ) => {
				if( ele[ attr ] ) {
					script[ attr ] = ele[ attr ];
				}
			} );
			doc.head.insertBefore( script, null );
			doc.head.removeChild( script );
		}
	} );
}
