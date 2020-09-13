import { fn } from "../setup";
import filtered from "../core/filtered";

fn.detach       = function( comparator ) {
	filtered( this, comparator ).each( ( i, ele ) => {
		if( ele.parentNode ) {
			ele.parentNode.removeChild( ele );
		}
	} );
	return this;
};
