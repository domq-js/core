import { fn } from "../setup";

fn.nextAll = function( comparator ) {
	return this.next( comparator, true );
};
