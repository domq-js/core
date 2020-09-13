import { fn } from "../setup";
import { filtered } from "../helper";

fn.remove       = function( comparator ) {
	filtered( this, comparator ).detach().off();
	return this;
};
