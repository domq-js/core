import core, { fn } from "../setup";
import { filtered, pluck, unique } from "../helper";

fn.parent       = function( comparator ) {
	return filtered( core( unique( pluck( this, 'parentNode' ) ) ), comparator );
};
