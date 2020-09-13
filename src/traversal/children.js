import core, { fn } from "../setup";
import { filtered, pluck, unique } from "../helper";

fn.children     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => ele.children ) ) ), comparator );
};
