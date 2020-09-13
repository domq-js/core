import evalScripts from "./evalScripts";

export default function( anchor, target, left, inside, evaluate ) {
	if( inside ) {
		anchor.insertBefore( target, left ? anchor.firstChild : null );
	} else {
		anchor.parentNode.insertBefore( target, left ? anchor : anchor.nextSibling );
	}
	if( evaluate ) {
		evalScripts( target, anchor.ownerDocument );
	}
}
