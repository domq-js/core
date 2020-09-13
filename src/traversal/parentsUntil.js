import { fn } from "../setup";

fn.parentsUntil = function( until, comparator ) {
	return this.parents( comparator, until );
};
