import core, { fn } from "../setup";

fn.replaceAll   = function( selector ) {
	core( selector ).replaceWith( this );
	return this;
};
