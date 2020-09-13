import { fn } from "../setup";
import cssMaps from "../core/vars/cssMaps";

fn.removeProp = function( prop ) {
	return this.each( ( i, ele ) => {
		let key    = cssMaps[ prop ] || prop;
		ele[ key ] = null;
		delete ele[ key ];
	} );
};
