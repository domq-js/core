import { fn } from "../setup";

fn.closest      = function( comparator ) {
	const filtered = this.filter( comparator );
	if( filtered.length ) {
		return filtered;
	}
	const $parent = this.parent();
	if( !$parent.length ) {
		return filtered;
	}
	return $parent.closest( comparator );
};
