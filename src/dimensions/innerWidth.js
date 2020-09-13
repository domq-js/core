import { fn } from "../setup";
import OuterInnerHandler from "./helper/OuterInnerHandler";

fn.innerWidth  = function( includeMargins ) {
	return OuterInnerHandler.call( this, 'inner', 'Width', includeMargins );
};
