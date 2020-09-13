import { fn } from "../setup";
import isUndefined from "../typechecking/isUndefined";
import isElement from "../typechecking/isElement";

fn.html = function( html ) {
	if( !arguments.length ) {
		return this[ 0 ] && this[ 0 ].innerHTML;
	}

	if( isUndefined( html ) ) {
		return this;
	}

	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		ele.innerHTML = html;
	} );
};
