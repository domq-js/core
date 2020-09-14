import { fn } from "../setup";
import insertSelectors from "./helper/insertSelectors";

fn.prependTo = function() {
	return insertSelectors( arguments, this, true, true, true, false, false, true );
};
