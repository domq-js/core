import { fn } from "../setup";

fn.prevAll      = function( comparator ) {
	return this.prev( comparator, true );
};
