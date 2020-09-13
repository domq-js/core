import core, { fn } from "../setup";
import vars from "../core/vars";

fn.ready   = function( callback ) {
	const cb = () => setTimeout( callback, 0, core );

	if( vars.doc.readyState !== 'loading' ) {
		cb();
	} else {
		vars.doc.addEventListener( 'DOMContentLoaded', cb );
	}
	return this;
};
