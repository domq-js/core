import core, { fn } from "../setup";
import filtered from "../core/filtered";
import pluck from "../utilities/pluck";
import unique from "../utilities/unique";

fn.parent = function( comparator ) {
	return filtered( core( unique( pluck( this, 'parentNode' ) ) ), comparator );
};
