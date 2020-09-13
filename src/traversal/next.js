import core, { fn } from "../setup";
import filtered from "../core/filtered";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.next         = function( comparator, _all, _until ) {
	return filtered( core( unique( pluck( this, 'nextElementSibling', _all, _until ) ) ), comparator );
};
