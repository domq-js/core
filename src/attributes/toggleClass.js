import { fn } from "../setup";
import { access, getSplitValues } from "../helper";
import _each from "../core/_each";
import { isElement, isUndefined } from "@varunsridharan/js-is";

fn.toggleClass = function( cls, force ) {
	const classes = getSplitValues( cls ),
		  isForce = !isUndefined( force );
	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		_each( classes, ( i, c ) => {
			c = access( c, i, ele );
			if( isForce ) {
				force ? ele.classList.add( c ) : ele.classList.remove( c );
			} else {
				ele.classList.toggle( c );
			}
		} );
	} );
};
