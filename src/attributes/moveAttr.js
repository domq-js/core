import { fn } from "../setup";
import attrHandler from "./helper/attrHandler";

fn.moveAttr = function( from, to ) {
	return attrHandler.call( this, from, to, true );
};
