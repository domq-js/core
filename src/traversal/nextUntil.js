import { fn } from "../setup";

fn.nextUntil    = function( until, comparator ) {
	return this.next( comparator, true, until );
};
