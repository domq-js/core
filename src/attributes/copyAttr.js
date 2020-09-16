import { fn } from "../setup";
import attrHandler from "./helper/attrHandler";

fn.copyAttr = function( from, to ) {
	return attrHandler.call( this, from, to );
};
