import { fn } from "../setup";

fn.one = function( eventFullName, selector, data, callback ) {
	return this.on( eventFullName, selector, data, callback, true );
};
