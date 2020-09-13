import core, { fn } from "../setup";
import doc from "../core/vars/doc";

fn.ready = function( callback ) {
	const cb = () => setTimeout( callback, 0, core );

	if( doc.readyState !== 'loading' ) {
		cb();
	} else {
		doc.addEventListener( 'DOMContentLoaded', cb );
	}
	return this;
};
