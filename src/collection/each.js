import { fn } from "../setup";
import _each from "../core/_each";

fn.each   = function( callback ) {
	return _each( this, callback );
};
