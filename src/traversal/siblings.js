import core, { fn } from "../setup";
import { filtered } from "../helper";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.siblings     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => core( ele ).parent().children().not( ele ) ) ) ), comparator );
};
