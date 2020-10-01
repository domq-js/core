import core from "../../setup";
import scriptAttrs from "../../core/vars/scriptAttrs";
import _each from "../../core/_each";
import { rHTMLCDATA, rscriptType } from "../../core/regex";
import { celem, docEle } from "@varunsridharan/js-vars";

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
