import { fn } from "../setup";

fn.prevUntil = function( until, comparator ) {
	return this.prev( comparator, true, until );
};
