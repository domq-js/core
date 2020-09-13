import core, { fn } from "../setup";
import { filtered, pluck, unique } from "../helper";

fn.siblings     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => core( ele ).parent().children().not( ele ) ) ) ), comparator );
};
