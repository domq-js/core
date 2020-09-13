import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.insertBefore = function( selector ) {
	return insertSelectors( arguments, this, true, true );
};
