import { fn } from "../setup";
import { isElement, isUndefined } from "../core/typechecking";

fn.html = function( html ) {
	if( !arguments.length ) {
		return this[ 0 ] && this[ 0 ].innerHTML;
	}
	if( isUndefined( html ) ) {
		return this;
	}
	return this.each( function( i, ele ) {
		if( !isElement( ele ) ) {
			return;
		}
		ele.innerHTML = html;
	} );
}
