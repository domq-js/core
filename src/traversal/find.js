import core, { fn } from "../setup";
import { _find, pluck, unique } from "../helper";

fn.find         = function( selector ) {
	return core( unique( pluck( this, ele => _find( selector, ele ) ) ) );
};
