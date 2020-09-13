import core, { fn } from "../setup";
import { _find } from "../helper";
import unique from "../utilities/unique";
import pluck from "../utilities/pluck";

fn.find         = function( selector ) {
	return core( unique( pluck( this, ele => _find( selector, ele ) ) ) );
};
