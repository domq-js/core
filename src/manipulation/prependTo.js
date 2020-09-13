import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.prependTo    = function( selector ) {
	return insertSelectors( arguments, this, true, true, true, false, false, true );
};
