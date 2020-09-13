import { fn } from "../setup";
import OuterInnerHandler from "./helper/OuterInnerHandler";

fn.outerHeight = function( includeMargins ) {
	return OuterInnerHandler( this, 'outer', 'Height', includeMargins );
};
