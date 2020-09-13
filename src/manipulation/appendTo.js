import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.appendTo     = function( selector ) {
	return insertSelectors( arguments, this, true, false, true );
};
