import { fn } from "../setup";

fn.empty = function() {
	return this.each( ( i, ele ) => {
		while( ele.firstChild ) {
			ele.removeChild( ele.firstChild );
		}
	} );
};
