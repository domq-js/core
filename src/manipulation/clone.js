import { fn } from "../setup";

fn.clone = function() {
	return this.map( ( i, ele ) => ele.cloneNode( true ) );
};
