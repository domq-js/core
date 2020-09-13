import core, { fn } from "../setup";
import _indexOf from "../core/vars/_indexOf";

fn.index = function( selector ) {
	const child      = selector ? core( selector )[ 0 ] : this[ 0 ],
		  collection = selector ? this : core( child ).parent().children();
	return _indexOf.call( collection, child );
};
