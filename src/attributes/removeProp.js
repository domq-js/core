import { fn } from "../setup";
import vars from "../core/vars";

fn.removeProp = function( prop ) {
	return this.each( ( i, ele ) => {
		let key    = vars.propMap[ prop ] || prop;
		ele[ key ] = null;
		delete ele[ key ];
	} );
};
