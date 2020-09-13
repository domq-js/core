import core, { fn } from "../setup";
import vars from "../core/vars";

fn.index  = function( selector ) {
	const child      = selector ? core( selector )[ 0 ] : this[ 0 ],
		  collection = selector ? this : core( child ).parent().children();
	return vars.indexOf.call( collection, child );
};
