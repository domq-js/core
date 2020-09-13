import core, { fn } from "../setup";
import { filtered, pluck, unique } from "../helper";

fn.prev         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'previousElementSibling', _all, _until ) ) ), comparator );
};
