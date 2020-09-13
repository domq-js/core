import { fn } from "../setup";
import OuterInnerHandler from "./helper/OuterInnerHandler";

fn.outerHeight = function( includeMargins ) {
	return OuterInnerHandler.call( this, 'outer', 'Height', includeMargins );
};
