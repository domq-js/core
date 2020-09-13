import core, { fn } from "../setup";
import { filtered } from "../helper";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.parents      = function( comparator, _until ) {
	return filtered( core( unique( pluck( this, 'parentElement', true, _until ) ) ), comparator );
};
