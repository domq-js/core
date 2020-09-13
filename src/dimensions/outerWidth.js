import { fn } from "../setup";
import OuterInnerHandler from "./helper/OuterInnerHandler";

fn.outerWidth  = function( includeMargins ) {
	return OuterInnerHandler.call( this, 'outer', 'Width', includeMargins );
};
