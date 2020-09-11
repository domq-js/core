import regex from "../regex";
import { scriptAttributes, docEle, celem } from "../core/vars";
import core from "../wrap";
import { each } from "../helper";

function evalScripts( node, doc ) {
	const collection = core( node );
	collection.filter( 'script' ).add( collection.find( 'script' ) ).each( ( i, ele ) => {
		if( regex.scriptType.test( ele.type ) && docEle.contains( ele ) ) {
			// The script type is supported
			// The element is attached to the DOM
			// Using `documentElement` for broader browser support
			const script = celem( 'script' );
			script.text  = ele.textContent.replace( regex.HTMLCDATA, '' );
			each( scriptAttributes, ( i, attr ) => {
				if( ele[ attr ] ) {
					script[ attr ] = ele[ attr ];
				}
			} );
			doc.head.insertBefore( script, null );
			doc.head.removeChild( script );
		}
	} );
}

function insertElement( anchor, target, left, inside, evaluate ) {
	if( inside ) {
		// prepend/append
		anchor.insertBefore( target, left ? anchor.firstChild : null );
	} else {
		// before/after
		anchor.parentNode.insertBefore( target, left ? anchor : anchor.nextSibling );
	}
	if( evaluate ) {
		evalScripts( target, anchor.ownerDocument );
	}
}

export default function insertSelectors( selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3 ) {
	each( selectors, ( si, selector ) => {
		each( core( selector ), ( ti, target ) => {
			each( core( anchors ), ( ai, anchor ) => {
				const anchorFinal = inverse ? target : anchor,
					  targetFinal = inverse ? anchor : target,
					  indexFinal  = inverse ? ti : ai;
				insertElement( anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode( true ), left, inside, !indexFinal );
			}, reverseLoop3 );
		}, reverseLoop2 );
	}, reverseLoop1 );
	return anchors;
}
