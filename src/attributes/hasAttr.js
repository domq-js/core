import { fn } from "../setup";

fn.hasAttr = function( attr ) {
	return ( this[ 0 ] && this[ 0 ].hasAttribute( attr ) );
};
