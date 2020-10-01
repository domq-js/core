import { rclass, rtag } from "./regex";
import { isDocument, isElement } from "@varunsridharan/js-is";

export default function( sel, ctx ) {
	if( !sel || ( !isDocument( ctx ) && !isElement( ctx ) ) ) {
		return [];
	}

	// Regex Test For Class.
	if( rclass.test( sel ) ) {
		return ctx.getElementsByClassName( sel.slice( 1 ) );
	}

	// Regex Test For Tag.
	if( rtag.test( sel ) ) {
		return ctx.getElementsByTagName( sel );
	}

	return ctx.querySelectorAll( sel );
}
