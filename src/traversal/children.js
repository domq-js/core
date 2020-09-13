import core, { fn } from "../setup";
import filtered from "../core/filtered";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.children     = function( comparator ) {
	return filtered( core( unique( pluck( this, ele => ele.children ) ) ), comparator );
};
