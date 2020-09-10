import regex from "../../regex";
import vars from "../../core/vars";
import core from "../../wrap";
import each from "../../core/each";

export default function evalScripts( node, doc ) {
	const collection = core( node );
	collection.filter( 'script' ).add( collection.find( 'script' ) ).each( ( i, ele ) => {
		if( regex.scriptType.test( ele.type ) && vars.docEle.contains( ele ) ) {
			// The script type is supported
			// The element is attached to the DOM
			// Using `documentElement` for broader browser support
			const script = vars.createElement( 'script' );
			script.text  = ele.textContent.replace( regex.HTMLCDATA, '' );
			each( vars.scriptAttributes, ( i, attr ) => {
				if( ele[ attr ] ) {
					script[ attr ] = ele[ attr ];
				}
			} );
			doc.head.insertBefore( script, null );
			doc.head.removeChild( script );
		}
	} );
}
