import core from "../../setup";
import docEle from "../../core/vars/docEle";
import scriptAttrs from "../../core/vars/scriptAttrs";
import _each from "../../core/_each";
import celem from "../../core/vars/celem";
import { rHTMLCDATA, rscriptType } from "../../core/regex";

export default function( node, doc ) {
	const collection = core( node );
	collection.filter( 'script' ).add( collection.find( 'script' ) ).each( ( i, ele ) => {
		if( rscriptType.test( ele.type ) && docEle.contains( ele ) ) {
			const script = celem( 'script' );
			script.text  = ele.textContent.replace( rHTMLCDATA, '' );
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
