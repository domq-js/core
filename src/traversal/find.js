import core, { fn } from "../setup";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";
import _find from "../core/_find";

fn.find = function( selector ) {
	return core( unique( pluck( this, ele => _find( selector, ele ) ) ) );
};
