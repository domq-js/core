import { fn } from "../setup";
import { access, getSplitValues } from "../helper";
import _each from "../core/_each";
import { isElement } from "@varunsridharan/js-is";

fn.removeAttr = function( attr ) {
	const attrs = getSplitValues( attr );
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		_each( attrs, ( L, a ) => {
			ele.removeAttribute( access( a, i, ele ) );
		} );
	} );
};
