import evalScripts from "./eval_scripts";

export default function insertElement( anchor, target, left, inside, evaluate ) {
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
