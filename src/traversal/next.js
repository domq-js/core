import core, { fn } from "../setup";
import { filtered, pluck, unique } from "../helper";

fn.next         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'nextElementSibling', _all, _until ) ) ), comparator );
};
