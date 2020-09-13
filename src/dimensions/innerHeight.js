import { fn } from "../setup";
import OuterInnerHandler from "./helper/OuterInnerHandler";

fn.innerHeight = function( includeMargins ) {
	return OuterInnerHandler( this, 'inner', 'Height', includeMargins );
};
