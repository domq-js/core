import core, { fn } from "../setup";
import { filtered, pluck, unique } from "../helper";

fn.parents      = function( comparator, _until ) {
	return filtered( core( unique( pluck( this, 'parentElement', true, _until ) ) ), comparator );
};
