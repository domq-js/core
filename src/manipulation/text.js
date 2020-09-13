import { fn } from "../setup";
import isUndefined from "../typechecking/isUndefined";
import isElement from "../typechecking/isElement";

fn.text         = function( text ) {
	if( isUndefined( text ) ) {
		return this[ 0 ] ? this[ 0 ].textContent : '';
	}

	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		ele.textContent = text;
	} );

};
