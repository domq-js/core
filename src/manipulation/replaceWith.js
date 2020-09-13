import { fn } from "../setup";

fn.replaceWith  = function( selector ) {
	return this.before( selector ).remove();
};
