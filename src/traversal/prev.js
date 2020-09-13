import core, { fn } from "../setup";
import filtered from "../core/filtered";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.prev         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'previousElementSibling', _all, _until ) ) ), comparator );
};
